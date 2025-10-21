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
    let where = {};
    if (req.query.title) {
      where.title = { [Op.substring]: req.query.title };
    }
    if (req.query.isbn) {
      where.isbn = { [Op.eq]: req.query.isbn };
    }
    const order = [];
    if (req.query.sortBy) {
      order.push([req.query.sortBy, req.query.order === "desc" ? "DESC" : "ASC"]);
    }
    const data = await Book.findAll({
      where: Object.keys(where).length ? where : undefined,
      order: order.length ? order : undefined
    });
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
