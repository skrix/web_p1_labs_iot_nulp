const db = require("../models");
const Category = db.Category;
const Product = db.Product;

exports.create = async (req, res) => {
  try {
    const data = await Category.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { includeProducts } = req.query;

    const options = {
      order: [['name', 'ASC']]
    };

    if (includeProducts === 'true') {
      options.include = [{
        model: Product,
        as: 'products',
        attributes: ['id', 'title', 'price', 'brand', 'image'],
        through: { attributes: [] }
      }];
    }

    const data = await Category.findAll(options);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { includeProducts } = req.query;

    const options = {
      where: { id: req.params.id }
    };

    if (includeProducts === 'true') {
      options.include = [{
        model: Product,
        as: 'products',
        through: { attributes: [] }
      }];
    }

    const data = await Category.findOne(options);

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [num] = await Category.update(req.body, {
      where: { id: req.params.id }
    });

    if (num === 1) {
      const updated = await Category.findByPk(req.params.id);
      res.json(updated);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const num = await Category.destroy({
      where: { id: req.params.id }
    });

    if (num === 1) {
      res.json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
