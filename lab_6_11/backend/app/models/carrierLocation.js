'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarrierLocation extends Model {
    static associate(models) {
      CarrierLocation.belongsTo(models.Carrier, {
        foreignKey: 'carrierId',
        as: 'carrier'
      });
    }
  }

  CarrierLocation.init({
    carrierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carriers',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'CarrierLocation',
    tableName: 'carrier_locations',
    timestamps: true
  });

  return CarrierLocation;
};
