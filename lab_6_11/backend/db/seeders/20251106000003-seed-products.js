'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: 1,
        title: 'RAYDROP Пуровер',
        description: 'Пуровер ручної роботи з харчової нержавіючої сталі AISI 304 для заварювання кави методом V60. Українське виробництво',
        price: 2415.00,
        currency: 'UAH',
        image: 'https://images.prom.ua/6880173555_w640_h640_6880173555.jpg',
        brandId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Аеропрес AeroPress Clear',
        description: 'Легендарний AeroPress з прозорого пластику. Комплект з 350 фільтрами. Швидке приготування, легке очищення',
        price: 1879.00,
        currency: 'UAH',
        image: 'https://kultura.coffee/content/images/22/800x800l80mc0/aeropress-clear-kavovarka-ruchna-aeropres-prozoryi-27763667068288.webp',
        brandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Кемекс Chemex Six Cup 990 мл',
        description: 'Оригінальний кемекс Chemex на 6 чашок. Класичний дизайн з дерев\'яною манжетою та шкіряним шнурком',
        price: 2399.00,
        currency: 'UAH',
        image: 'https://images.prom.ua/5861208477_w640_h640_5861208477.jpg',
        brandId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'Аеропрес AeroPress Go',
        description: 'Компактний аеропрес для подорожей. Легкий і зручний, ідеально підходить для використання поза домом',
        price: 1845.00,
        currency: 'UAH',
        image: 'https://kulturrra.coffee/content/images/25/1193x1280l80nn10/kavovarka-ruchna-aeropress-go-56229497960498.webp',
        brandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title: 'Пуровер Дотик Dotyk Dripper Brown',
        description: 'Український дриппер Dotyk Next Generation з унікальним дизайном для рівномірної екстракції кави',
        price: 1669.00,
        currency: 'UAH',
        image: 'https://images.prom.ua/6547233120_w640_h640_6547233120.jpg',
        brandId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        title: 'Аеропрес AeroPress XL',
        description: 'Збільшена версія класичного AeroPress. Дозволяє приготувати більше кави за один раз',
        price: 2549.00,
        currency: 'UAH',
        image: 'https://images.prom.ua/5186715890_w640_h640_5186715890.jpg',
        brandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        title: 'Кемекс Chemex 3 cup 473 мл',
        description: 'Компактний кемекс Chemex на 3 чашки. Ідеально для індивідуального використання',
        price: 2399.00,
        currency: 'UAH',
        image: 'https://images.prom.ua/5861094830_w640_h640_5861094830.jpg',
        brandId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        title: 'Фільтр SIBARIST Dual Chamber Paper',
        description: 'Преміум фільтри SIBARIST з подвійною камерою. 30 шт. Для найчистішого смаку кави',
        price: 1329.00,
        currency: 'UAH',
        image: 'https://images.prom.ua/6024460352_w640_h640_6024460352.jpg',
        brandId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        title: 'Пуровер Conical 30 Single Dripper',
        description: 'Компактний конічний пуровер для приготування однієї порції кави. Простий у використанні',
        price: 289.00,
        currency: 'UAH',
        image: 'https://images.prom.ua/6423393425_w640_h640_6423393425.jpg',
        brandId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        title: 'Сервер 400 мл Samadoyo',
        description: 'Термостійкий скляний сервер з мірною шкалою. Універсальний для кави та чаю',
        price: 548.00,
        currency: 'UAH',
        image: 'https://kultura.coffee/content/images/42/733x469l80mc0/sklianyi-chakhai-samadoyo-cp-14-400-ml-56239048577794.webp',
        brandId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        title: 'Кемекс Chemex 8 Cup',
        description: 'Великий кемекс Chemex на 8 чашок. Ідеально для сім\'ї або компанії друзів',
        price: 2499.00,
        currency: 'UAH',
        image: 'https://images.prom.ua/4351108675_w640_h640_kemeks-dlya-kofe.jpg',
        brandId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        title: 'Набір Кемекс Chemex 3 cup + Фільтри',
        description: 'Комплект: кемекс на 3 чашки + паперові фільтри FP-2. Все необхідне для початку',
        price: 2785.00,
        currency: 'UAH',
        image: 'https://images.prom.ua/5861206969_w640_h640_5861206969.jpg',
        brandId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
