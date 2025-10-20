const db = require("../models");
const OrderItem = db.OrderItem;

// Create a new OrderItem
exports.create = async (req, res) => {
  try {
    const data = await OrderItem.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all order items
exports.findAll = async (req, res) => {
  try {
    const data = await OrderItem.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single order item by id
exports.findOne = async (req, res) => {
  try {
    const data = await OrderItem.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "OrderItem not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an order item
exports.update = async (req, res) => {
  try {
    const [num] = await OrderItem.update(req.body, {
      where: { id: req.params.id },
    });
    if (num === 1) res.json({ message: "OrderItem updated successfully" });
    else res.status(404).json({ message: "OrderItem not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an order item
exports.delete = async (req, res) => {
  try {
    const num = await OrderItem.destroy({ where: { id: req.params.id } });
    if (num === 1) res.json({ message: "OrderItem deleted successfully" });
    else res.status(404).json({ message: "OrderItem not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
