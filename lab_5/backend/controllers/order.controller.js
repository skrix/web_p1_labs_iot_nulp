const db = require("../models");
const Order = db.Order;

// Create a new Order
exports.create = async (req, res) => {
  try {
    const data = await Order.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders
exports.findAll = async (req, res) => {
  try {
    const data = await Order.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single order by id
exports.findOne = async (req, res) => {
  try {
    const data = await Order.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Order not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an order
exports.update = async (req, res) => {
  try {
    const [num] = await Order.update(req.body, {
      where: { id: req.params.id },
    });
    if (num === 1) res.json({ message: "Order updated successfully" });
    else res.status(404).json({ message: "Order not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an order
exports.delete = async (req, res) => {
  try {
    const num = await Order.destroy({ where: { id: req.params.id } });
    if (num === 1) res.json({ message: "Order deleted successfully" });
    else res.status(404).json({ message: "Order not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
