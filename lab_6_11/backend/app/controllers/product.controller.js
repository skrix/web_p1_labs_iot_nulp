const db = require("../models");
const Product = db.Product;
const Category = db.Category;
const Brand = db.Brand;
const ProductItem = db.ProductItem;

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
          as: "categories",
          attributes: ["id", "name", "slug", "label"],
          through: { attributes: [] }
        },
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name", "slug"]
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
      as: "brand",
      attributes: ["id", "name", "slug"]
    };

    if (brand) {
      brandInclude.where = { slug: brand };
      brandInclude.required = true;
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) {
        whereClause.price[db.Sequelize.Op.gte] = parseFloat(minPrice);
      }
      if (maxPrice) {
        whereClause.price[db.Sequelize.Op.lte] = parseFloat(maxPrice);
      }
    }

    if (search) {
      whereClause[db.Sequelize.Op.or] = [
        { title: { [db.Sequelize.Op.like]: `%${search}%` } },
        { description: { [db.Sequelize.Op.like]: `%${search}%` } }
      ];
    }

    const categoryInclude = {
      model: Category,
      as: "categories",
      attributes: ["id", "name", "slug", "label"],
      through: { attributes: [] }
    };

    if (category) {
      categoryInclude.where = { slug: category };
      categoryInclude.required = true;
    }

    const products = await Product.findAll({
      where: whereClause,
      include: [
        categoryInclude,
        brandInclude,
        {
          model: ProductItem,
          as: "items",
          attributes: ["id", "variation", "sku", "price", "currency", "stock", "isAvailable", "description", "image"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name", "slug", "label"],
          through: { attributes: [] }
        },
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name", "slug"]
        },
        {
          model: ProductItem,
          as: "items",
          attributes: ["id", "variation", "sku", "price", "currency", "stock", "isAvailable", "description", "image"]
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { categoryIds, ...productData } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update(productData);

    if (categoryIds && Array.isArray(categoryIds)) {
      const categories = await Category.findAll({
        where: { id: categoryIds }
      });
      await product.setCategories(categories);
    }

    const updatedProduct = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name", "slug", "label"],
          through: { attributes: [] }
        },
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name", "slug"]
        }
      ]
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
