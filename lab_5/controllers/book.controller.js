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
    const data = await Book.findAll();
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
