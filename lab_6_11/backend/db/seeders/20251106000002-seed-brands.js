'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('brands', [
      {
        id: 1,
        name: 'Vasyl & Co',
        slug: 'vasyl-co',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'AeroPress',
        slug: 'aeropress',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Chemex',
        slug: 'chemex',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Dotyk',
        slug: 'dotyk',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Sibarist',
        slug: 'sibarist',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Generic',
        slug: 'generic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Samadoyo',
        slug: 'samadoyo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  }
};
