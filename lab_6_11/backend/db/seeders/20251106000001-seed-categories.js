'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Пуровери',
        slug: 'pourover',
        label: 'Пуровери',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Кемекси',
        slug: 'chemex',
        label: 'Кемекси',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Аеропреси',
        slug: 'aeropress',
        label: 'Аеропреси',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Фільтри',
        slug: 'filters',
        label: 'Фільтри',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Чайники',
        slug: 'kettles',
        label: 'Чайники',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Сервери',
        slug: 'servers',
        label: 'Сервери',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Ваги',
        slug: 'scales',
        label: 'Ваги',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Кавомолки',
        slug: 'grinders',
        label: 'Кавомолки',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Аксесуари',
        slug: 'accessories',
        label: 'Аксесуари',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
