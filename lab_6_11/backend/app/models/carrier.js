'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carrier extends Model {
    static associate(models) {
      Carrier.hasMany(models.Order, {
        foreignKey: 'carrierId',
        as: 'orders'
      });

      Carrier.hasMany(models.CarrierLocation, {
        foreignKey: 'carrierId',
        as: 'locations'
      });
    }
  }

  Carrier.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Carrier',
    tableName: 'carriers',
    timestamps: true
  });

  return Carrier;
};
