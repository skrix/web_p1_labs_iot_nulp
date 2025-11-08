'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('carriers', [
      {
        name: 'Нова Пошта',
        code: 'nova-poshta',
        logo: 'https://novapost.com/images/group/novaposhta.svg',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Укрпошта',
        code: 'ukrposhta',
        logo: 'https://www.ukrposhta.ua/design/web/images/site-ua-logo.svg',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Meest Express',
        code: 'meest',
        logo: 'https://meestposhta.com.ua/images/logo_2.svg',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Самовивіз',
        code: 'self-pickup',
        logo: 'https://www.svgrepo.com/show/324769/delivery-pickup-cargo.svg',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carriers', null, {});
  }
};
