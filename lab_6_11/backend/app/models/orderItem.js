'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });

      OrderItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });

      // OrderItem can reference a specific ProductItem
      OrderItem.belongsTo(models.ProductItem, {
        foreignKey: 'productItemId',
        as: 'productItem'
      });
    }
  }

  OrderItem.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    productItemId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product_items',
        key: 'id'
      }
    },
    variation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'UAH'
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: true
  });

  return OrderItem;
};
