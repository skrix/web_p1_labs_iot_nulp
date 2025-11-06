'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_categories', [
      {
        productId: 1,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 4,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 5,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 6,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 7,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 8,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 9,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 10,
        categoryId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 11,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 12,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', null, {});
  }
};
