const db = require("../models");
const Carrier = db.Carrier;

exports.create = async (req, res) => {
  try {
    const { name, code, description, logo, isActive } = req.body;

    const carrier = await Carrier.create({
      name,
      code,
      description,
      logo,
      isActive
    });

    res.status(201).json(carrier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const carriers = await Carrier.findAll({
      where: { isActive: true }
    });

    res.status(200).json(carriers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const carrier = await Carrier.findByPk(id);

    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    res.status(200).json(carrier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, code, description, logo, isActive } = req.body;

    const carrier = await Carrier.findByPk(id);

    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    await carrier.update({
      name,
      code,
      description,
      logo,
      isActive
    });

    res.status(200).json(carrier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const carrier = await Carrier.findByPk(id);

    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    await carrier.destroy();
    res.status(200).json({ message: "Carrier deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
