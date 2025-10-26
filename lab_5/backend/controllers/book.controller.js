const { Op } = require("sequelize");
const db = require("../models");
const Book = db.Book;

// Create a new Book
exports.create = async (req, res) => {
  try {
    const data = await Book.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all books
exports.findAll = async (req, res) => {
  try {
    const where = {};
    const { search, orderBy, order, minPrice, maxPrice } = req.query;
    where[Op.or] = [{ title: { [Op.substring]: search } }];

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }

    const options = {
      where: (search || maxPrice || minPrice) ? where : undefined,
      order: orderBy ? [[orderBy, order === "desc" ? "DESC" : "ASC"]] : undefined
    };

    console.log(Object.keys(where));
    console.log(Object.keys(where).length);
    console.log(where);
    console.log(options);
    const data = await Book.findAll(options);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single book by id
exports.findOne = async (req, res) => {
  try {
    const data = await Book.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Book not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a book
exports.update = async (req, res) => {
  try {
    const [num] = await Book.update(req.body, {
      where: { id: req.params.id },
    });
    if (num === 1) res.json({ message: "Book updated successfully" });
    else res.status(404).json({ message: "Book not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a book
exports.delete = async (req, res) => {
  try {
    const num = await Book.destroy({ where: { id: req.params.id } });
    if (num === 1) res.json({ message: "Book deleted successfully" });
    else res.status(404).json({ message: "Book not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
