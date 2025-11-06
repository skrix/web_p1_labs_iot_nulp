'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'brandId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'brands',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    await queryInterface.removeColumn('products', 'brand');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'brand', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'unknown'
    });

    await queryInterface.removeColumn('products', 'brandId');
  }
};
