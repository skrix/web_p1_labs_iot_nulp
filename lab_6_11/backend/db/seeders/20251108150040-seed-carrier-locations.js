'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // First, get carrier IDs
    const carriers = await queryInterface.sequelize.query(
      `SELECT id, code FROM carriers;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const carrierMap = {};
    carriers.forEach(carrier => {
      carrierMap[carrier.code] = carrier.id;
    });

    const locations = [
      // Nova Poshta locations
      {
        carrierId: carrierMap['nova-poshta'],
        name: 'Відділення №1',
        code: 'np-1',
        address: 'вул. Хрещатик, 1',
        city: 'Київ',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['nova-poshta'],
        name: 'Відділення №5',
        code: 'np-2',
        address: 'вул. Шевченка, 15',
        city: 'Київ',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['nova-poshta'],
        name: 'Відділення №12',
        code: 'np-3',
        address: 'просп. Перемоги, 42',
        city: 'Київ',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['nova-poshta'],
        name: 'Відділення №20',
        code: 'np-4',
        address: 'вул. Лесі Українки, 8',
        city: 'Київ',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['nova-poshta'],
        name: 'Відділення №33',
        code: 'np-5',
        address: 'вул. Бандери, 25',
        city: 'Київ',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Ukrposhta locations
      {
        carrierId: carrierMap['ukrposhta'],
        name: 'Відділення №1',
        code: 'up-1',
        address: 'вул. Центральна, 5',
        city: 'Київ',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['ukrposhta'],
        name: 'Відділення №3',
        code: 'up-2',
        address: 'вул. Грушевського, 12',
        city: 'Київ',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['ukrposhta'],
        name: 'Відділення №7',
        code: 'up-3',
        address: 'просп. Незалежності, 30',
        city: 'Київ',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['ukrposhta'],
        name: 'Відділення №10',
        code: 'up-4',
        address: 'вул. Франка, 18',
        city: 'Київ',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Meest locations
      {
        carrierId: carrierMap['meest'],
        name: 'Відділення №1',
        code: 'meest-1',
        address: 'вул. Городоцька, 25',
        city: 'Львів',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['meest'],
        name: 'Відділення №2',
        code: 'meest-2',
        address: 'вул. Наукова, 7',
        city: 'Львів',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['meest'],
        name: 'Відділення №5',
        code: 'meest-3',
        address: 'просп. В. Чорновола, 53',
        city: 'Львів',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['meest'],
        name: 'Відділення №8',
        code: 'meest-4',
        address: 'вул. Стрийська, 120',
        city: 'Львів',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Self-pickup locations
      {
        carrierId: carrierMap['self-pickup'],
        name: 'Магазин - Центр',
        code: 'shop-center',
        address: 'вул. Театральна, 10',
        city: 'Львів',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['self-pickup'],
        name: 'Магазин - King Cross Leopolis',
        code: 'shop-mall',
        address: 'ТРЦ King Cross Leopolis',
        city: 'Львів',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        carrierId: carrierMap['self-pickup'],
        name: 'Магазин - Victoria Gardens',
        code: 'shop-victoria',
        address: 'ТРЦ Victoria Gardens',
        city: 'Львів',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('carrier_locations', locations, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carrier_locations', null, {});
  }
};
