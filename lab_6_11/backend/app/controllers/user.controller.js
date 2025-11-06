const db = require("../models");
const User = db.User;

// Create a new User
exports.create = async (req, res) => {
  try {
    const data = await User.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.findAll = async (req, res) => {
  try {
    const data = await User.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by id
exports.findOne = async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "User not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user
exports.update = async (req, res) => {
  try {
    const [num] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (num === 1) res.json({ message: "User updated successfully" });
    else res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user
exports.delete = async (req, res) => {
  try {
    const num = await User.destroy({ where: { id: req.params.id } });
    if (num === 1) res.json({ message: "User deleted successfully" });
    else res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
