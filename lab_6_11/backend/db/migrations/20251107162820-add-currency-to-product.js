'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'currency', {
      type: Sequelize.STRING(3),
      allowNull: false,
      defaultValue: 'UAH'
    });

    await queryInterface.sequelize.query(
      "UPDATE products SET currency = 'UAH' WHERE currency IS NULL"
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'currency');
  }
};
