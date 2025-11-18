'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: 'ProductCategory',
        foreignKey: 'productId',
        otherKey: 'categoryId',
        as: 'categories'
      });

      Product.belongsTo(models.Brand, {
        foreignKey: 'brandId',
        as: 'brand'
      });

      // Product has many ProductItems (actual buyable instances)
      Product.hasMany(models.ProductItem, {
        foreignKey: 'productId',
        as: 'items'
      });
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'UAH'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'brands',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true
  });
  return Product;
};
