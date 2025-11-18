const db = require('../models');
const Brand = db.Brand;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    const data = await Brand.create(req.body);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Brand."
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Brand.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving brands."
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Brand.findOne({
      where: { id: id }
    });

    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Brand with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Brand with id=" + req.params.id
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const num = await Brand.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.send({
        message: "Brand was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Brand with id=" + req.params.id
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const num = await Brand.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.send({
        message: "Brand was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Brand with id=" + req.params.id
    });
  }
};
