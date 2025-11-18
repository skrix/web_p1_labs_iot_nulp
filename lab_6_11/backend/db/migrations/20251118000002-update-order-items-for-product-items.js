'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add productItemId column to order_items
    await queryInterface.addColumn('order_items', 'productItemId', {
      type: Sequelize.INTEGER,
      allowNull: true, // nullable for backward compatibility
      references: {
        model: 'product_items',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // Add variation snapshot to preserve what was ordered
    await queryInterface.addColumn('order_items', 'variation', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    // Add index
    await queryInterface.addIndex('order_items', ['productItemId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('order_items', 'productItemId');
    await queryInterface.removeColumn('order_items', 'variation');
  }
};
