const db = require("../models");
const Product = db.Product;
const Category = db.Category;

// Create a new Product
exports.create = async (req, res) => {
  try {
    const { title, description, price, image, brand, categoryIds } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      image,
      brand
    });

    // If categoryIds are provided, associate them with the product
    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
      const categories = await Category.findAll({
        where: { id: categoryIds }
      });
      await product.setCategories(categories);
    }

    // Fetch the product with categories
    const createdProduct = await Product.findByPk(product.id, {
      include: [{
        model: Category,
        as: 'categories',
        attributes: ['id', 'name', 'slug', 'label'],
        through: { attributes: [] }
      }]
    });

    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products
exports.findAll = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, search } = req.query;

    let whereClause = {};

    // Filter by brand
    if (brand) {
      whereClause.brand = brand;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[db.Sequelize.Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereClause.price[db.Sequelize.Op.lte] = parseFloat(maxPrice);
    }

    // Search by title or description
    if (search) {
      whereClause[db.Sequelize.Op.or] = [
        { title: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { description: { [db.Sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    const includeOptions = {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name', 'slug', 'label'],
      through: { attributes: [] }
    };

    // Filter by category if provided
    if (category) {
      includeOptions.where = { slug: category };
      includeOptions.required = true;
    }

    const data = await Product.findAll({
      where: whereClause,
      include: [includeOptions],
      order: [['createdAt', 'DESC']]
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by id
exports.findOne = async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'categories',
        attributes: ['id', 'name', 'slug', 'label'],
        through: { attributes: [] }
      }]
    });

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a product
exports.update = async (req, res) => {
  try {
    const { categoryIds, ...productData } = req.body;

    const [num] = await Product.update(productData, {
      where: { id: req.params.id }
    });

    if (num === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findByPk(req.params.id);

    // Update categories if provided
    if (categoryIds && Array.isArray(categoryIds)) {
      const categories = await Category.findAll({
        where: { id: categoryIds }
      });
      await product.setCategories(categories);
    }

    // Fetch updated product with categories
    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'categories',
        attributes: ['id', 'name', 'slug', 'label'],
        through: { attributes: [] }
      }]
    });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a product
exports.delete = async (req, res) => {
  try {
    const num = await Product.destroy({
      where: { id: req.params.id }
    });

    if (num === 1) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
