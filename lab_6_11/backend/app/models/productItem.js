module.exports = (sequelize, DataTypes) => {
  const ProductItem = sequelize.define(
    'ProductItem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      variation: {
        type: DataTypes.ENUM('standard', 'premium', 'deluxe'),
        allowNull: false,
        defaultValue: 'standard',
      },
      sku: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'UAH',
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'product_items',
      timestamps: true,
    }
  );

  ProductItem.associate = (models) => {
    // ProductItem belongs to Product (parent/template)
    ProductItem.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });

    // ProductItem can be in OrderItems
    ProductItem.hasMany(models.OrderItem, {
      foreignKey: 'productItemId',
      as: 'orderItems',
    });
  };

  return ProductItem;
};
