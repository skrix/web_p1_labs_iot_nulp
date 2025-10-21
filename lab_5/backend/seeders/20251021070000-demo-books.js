'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Танець недоумка',
        author: 'Ілларіон Павлюк',
        description: 'Науково-фантастичний роман із психологічним підтекстом про таємниці людської свідомості та космосу.',
        price: 500,
        genre: 'science_fiction',
        isbn: '978-617-679-720-3',
        image_url: 'https://book-ye.com.ua/media/catalog/product/cache/274ba2bb1664e69238223826e1132b42/5/2/52e81d41-de9d-11e9-8121-000c29ae1566_04a1a32a-7b94-11ed-8177-0050568ef5e6_19.jpg',
        stock: 10,
        published_date: new Date('2019-01-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Подорож на Пуп Землі',
        author: 'Макс Кідрук',
        description: 'Пригодницько-фантастичний роман про експедицію на острів Пасхи з поєднанням наукових фактів і містики.',
        price: 300,
        genre: 'fantasy',
        isbn: '978-966-2961-60-7',
        image_url: 'https://book-ye.com.ua/media/catalog/product/cache/274ba2bb1664e69238223826e1132b42/0/5/055b43fb-8ca0-11e6-80c0-000c29ae1566_ae2e5f4f-8ef0-11e7-80cf-000c29ae1566.jpg',
        stock: 15,
        published_date: new Date('2016-01-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Напролом. Мистецтво перетворювати перешкоди на перемоги',
        author: 'Раян Голідей',
        description: 'Книга-нон-фікшн про стоїцизм, як перешкоди можуть стати можливістю для розвитку і досягнення перемоги.',
        price: 165,
        genre: 'self_help',
        isbn: '978-617-7388-13-4',
        image_url: 'https://book-ye.com.ua/media/catalog/product/cache/274ba2bb1664e69238223826e1132b42/1/a/1a3f39d4-1df9-11e7-80c5-000c29ae1566_e0d3bc6b-94f9-11ea-8136-000c29ae1566.jpg',
        stock: 20,
        published_date: new Date('2014-01-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Час — найпростіша річ',
        author: 'Кліффорд Сімак',
        description: 'Фантастичний роман про телепатів, що відкривають нові світи і ведуть боротьбу за свободу.',
        price: 350,
        genre: 'science_fiction',
        isbn: '978-617-664-252-2',
        image_url: 'https://book-ye.com.ua/media/catalog/product/cache/274ba2bb1664e69238223826e1132b42/5/9/59d79aed-c624-11e8-810b-000c29ae1566_a17ed463-91b0-11ed-8178-0050568ef5e6.jpg',
        stock: 12,
        published_date: new Date('1961-01-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Транзитна станція',
        author: 'Кліффорд Сімак',
        description: 'Роман про людство як транзитну ланку у розвитку розумного життя у Всесвіті.',
        price: 360,
        genre: 'science_fiction',
        isbn: '978-617-664-253-9',
        image_url: 'https://book-ye.com.ua/media/catalog/product/cache/274ba2bb1664e69238223826e1132b42/e/1/e1511da8-db7c-11e8-810d-000c29ae1566_cea16ee4-91ae-11ed-8178-0050568ef5e6.jpg',
        stock: 8,
        published_date: new Date('1963-01-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Броньований Розум',
        author: 'Констянтин Ульянов',
        description: 'Нон-фікшн книга про стресостійкість, психологічну підготовку та витривалість у бойових умовах.',
        price: 741,
        genre: 'non_fiction',
        isbn: '978-617-7107-71-1',
        image_url: 'https://nashformat.ua/files/products/bronyovanyi-rozum-cover-book-a5-final-ua_page-0001.800x800.jpg',
        stock: 5,
        published_date: new Date('2023-01-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
