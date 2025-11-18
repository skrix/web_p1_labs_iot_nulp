const db = require("../models");
const CarrierLocation = db.CarrierLocation;

exports.create = async (req, res) => {
  try {
    const { carrierId, name, code, address, city, isActive } = req.body;

    const location = await CarrierLocation.create({
      carrierId,
      name,
      code,
      address,
      city,
      isActive
    });

    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { carrierId } = req.query;

    let where = { isActive: true };
    if (carrierId) {
      where.carrierId = carrierId;
    }

    const locations = await CarrierLocation.findAll({ where });

    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const location = await CarrierLocation.findByPk(id);

    if (!location) {
      return res.status(404).json({ message: "Carrier location not found" });
    }

    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, code, address, city, isActive } = req.body;

    const location = await CarrierLocation.findByPk(id);

    if (!location) {
      return res.status(404).json({ message: "Carrier location not found" });
    }

    await location.update({
      name,
      code,
      address,
      city,
      isActive
    });

    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const location = await CarrierLocation.findByPk(id);

    if (!location) {
      return res.status(404).json({ message: "Carrier location not found" });
    }

    await location.destroy();
    res.status(200).json({ message: "Carrier location deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
