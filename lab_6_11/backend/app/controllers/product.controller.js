const db = require("../models");
const Product = db.Product;
const Category = db.Category;
const Brand = db.Brand;

exports.create = async (req, res) => {
  try {
    const { title, description, price, image, brandId, categoryIds } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      image,
      brandId
    });

    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
      const categories = await Category.findAll({
        where: { id: categoryIds }
      });
      await product.setCategories(categories);
    }

    const createdProduct = await Product.findByPk(product.id, {
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'slug', 'label'],
          through: { attributes: [] }
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, search } = req.query;

    let whereClause = {};
    let brandInclude = {
      model: Brand,
      as: 'brand',
      attributes: ['id', 'name', 'slug']
    };

    if (brand) {
      brandInclude.where = { slug: brand };
      brandInclude.required = true;
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[db.Sequelize.Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereClause.price[db.Sequelize.Op.lte] = parseFloat(maxPrice);
    }

    if (search) {
      whereClause[db.Sequelize.Op.or] = [
        { title: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { description: { [db.Sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    const categoryInclude = {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name', 'slug', 'label'],
      through: { attributes: [] }
    };

    if (category) {
      categoryInclude.where = { slug: category };
      categoryInclude.required = true;
    }

    const data = await Product.findAll({
      where: whereClause,
      include: [categoryInclude, brandInclude],
      order: [['createdAt', 'DESC']]
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'slug', 'label'],
          through: { attributes: [] }
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

    if (categoryIds && Array.isArray(categoryIds)) {
      const categories = await Category.findAll({
        where: { id: categoryIds }
      });
      await product.setCategories(categories);
    }

    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'slug', 'label'],
          through: { attributes: [] }
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
