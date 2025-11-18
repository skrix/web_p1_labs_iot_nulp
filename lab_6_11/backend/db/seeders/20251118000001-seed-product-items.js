'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productItems = [];

    // Product 1: RAYDROP Пуровер (base: 2415 UAH)
    productItems.push(
      {
        productId: 1,
        variation: 'standard',
        sku: 'RAYDROP-POUR-STD',
        price: 2415.00,
        currency: 'UAH',
        stock: 25,
        isAvailable: true,
        description: 'Базова комплектація пуровера з нержавіючої сталі',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        variation: 'premium',
        sku: 'RAYDROP-POUR-PREM',
        price: 2890.00,
        currency: 'UAH',
        stock: 15,
        isAvailable: true,
        description: 'Комплект: пуровер + підставка + керамічна чашка',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        variation: 'deluxe',
        sku: 'RAYDROP-POUR-DLX',
        price: 3415.00,
        currency: 'UAH',
        stock: 8,
        isAvailable: true,
        description: 'Повний набір: пуровер + підставка + 2 чашки + 100 фільтрів',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 2: AeroPress Clear (base: 1879 UAH)
    productItems.push(
      {
        productId: 2,
        variation: 'standard',
        sku: 'AERO-CLEAR-STD',
        price: 1879.00,
        currency: 'UAH',
        stock: 30,
        isAvailable: true,
        description: 'Стандартна комплектація з 350 фільтрами',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        variation: 'premium',
        sku: 'AERO-CLEAR-PREM',
        price: 2299.00,
        currency: 'UAH',
        stock: 20,
        isAvailable: true,
        description: 'Комплект + металевий багаторазовий фільтр',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        variation: 'deluxe',
        sku: 'AERO-CLEAR-DLX',
        price: 2749.00,
        currency: 'UAH',
        stock: 12,
        isAvailable: true,
        description: 'Повний набір + металевий фільтр + 1000 паперових фільтрів',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 3: Chemex Six Cup (base: 2399 UAH)
    productItems.push(
      {
        productId: 3,
        variation: 'standard',
        sku: 'CHEMEX-6CUP-STD',
        price: 2399.00,
        currency: 'UAH',
        stock: 18,
        isAvailable: true,
        description: 'Оригінальний кемекс на 6 чашок',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        variation: 'premium',
        sku: 'CHEMEX-6CUP-PREM',
        price: 2849.00,
        currency: 'UAH',
        stock: 12,
        isAvailable: true,
        description: 'Кемекс + 100 оригінальних фільтрів FS-100',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        variation: 'deluxe',
        sku: 'CHEMEX-6CUP-DLX',
        price: 3299.00,
        currency: 'UAH',
        stock: 7,
        isAvailable: true,
        description: 'Кемекс + фільтри + скляна кришка',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 4: AeroPress Go (base: 1845 UAH)
    productItems.push(
      {
        productId: 4,
        variation: 'standard',
        sku: 'AERO-GO-STD',
        price: 1845.00,
        currency: 'UAH',
        stock: 22,
        isAvailable: true,
        description: 'Стандартний набір для подорожей',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 4,
        variation: 'premium',
        sku: 'AERO-GO-PREM',
        price: 2195.00,
        currency: 'UAH',
        stock: 16,
        isAvailable: true,
        description: 'Набір + термочашка 350мл',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 4,
        variation: 'deluxe',
        sku: 'AERO-GO-DLX',
        price: 2645.00,
        currency: 'UAH',
        stock: 9,
        isAvailable: true,
        description: 'Повний набір мандрівника + термос + металевий фільтр',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 5: Пуровер Дотик Dotyk (base: 1669 UAH)
    productItems.push(
      {
        productId: 5,
        variation: 'standard',
        sku: 'DOTYK-BROWN-STD',
        price: 1669.00,
        currency: 'UAH',
        stock: 20,
        isAvailable: true,
        description: 'Український дриппер Dotyk Brown',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 5,
        variation: 'premium',
        sku: 'DOTYK-BROWN-PREM',
        price: 1999.00,
        currency: 'UAH',
        stock: 14,
        isAvailable: true,
        description: 'Дриппер + керамічна підставка',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 5,
        variation: 'deluxe',
        sku: 'DOTYK-BROWN-DLX',
        price: 2449.00,
        currency: 'UAH',
        stock: 8,
        isAvailable: true,
        description: 'Повний набір + підставка + сервер 400мл + фільтри',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 6: AeroPress XL (base: 2549 UAH)
    productItems.push(
      {
        productId: 6,
        variation: 'standard',
        sku: 'AERO-XL-STD',
        price: 2549.00,
        currency: 'UAH',
        stock: 15,
        isAvailable: true,
        description: 'Збільшена версія AeroPress',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 6,
        variation: 'premium',
        sku: 'AERO-XL-PREM',
        price: 2999.00,
        currency: 'UAH',
        stock: 10,
        isAvailable: true,
        description: 'AeroPress XL + металевий фільтр',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 6,
        variation: 'deluxe',
        sku: 'AERO-XL-DLX',
        price: 3549.00,
        currency: 'UAH',
        stock: 6,
        isAvailable: true,
        description: 'Максимальний набір + металевий фільтр + 1000 паперових',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 7: Chemex 3 Cup (base: 2399 UAH)
    productItems.push(
      {
        productId: 7,
        variation: 'standard',
        sku: 'CHEMEX-3CUP-STD',
        price: 2399.00,
        currency: 'UAH',
        stock: 16,
        isAvailable: true,
        description: 'Компактний кемекс на 3 чашки',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 7,
        variation: 'premium',
        sku: 'CHEMEX-3CUP-PREM',
        price: 2749.00,
        currency: 'UAH',
        stock: 11,
        isAvailable: true,
        description: 'Кемекс + 50 оригінальних фільтрів FP-2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 7,
        variation: 'deluxe',
        sku: 'CHEMEX-3CUP-DLX',
        price: 3149.00,
        currency: 'UAH',
        stock: 5,
        isAvailable: true,
        description: 'Кемекс + фільтри + скляна кришка + чашка',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 8: Фільтр SIBARIST (base: 1329 UAH)
    productItems.push(
      {
        productId: 8,
        variation: 'standard',
        sku: 'SIBARIST-30-STD',
        price: 1329.00,
        currency: 'UAH',
        stock: 40,
        isAvailable: true,
        description: 'Упаковка 30 шт преміум фільтрів',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 8,
        variation: 'premium',
        sku: 'SIBARIST-100-PREM',
        price: 3999.00,
        currency: 'UAH',
        stock: 25,
        isAvailable: true,
        description: 'Економ-упаковка 100 шт',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 8,
        variation: 'deluxe',
        sku: 'SIBARIST-300-DLX',
        price: 10999.00,
        currency: 'UAH',
        stock: 10,
        isAvailable: true,
        description: 'Професійна упаковка 300 шт',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 9: Conical Dripper (base: 289 UAH)
    productItems.push(
      {
        productId: 9,
        variation: 'standard',
        sku: 'CONICAL-30-STD',
        price: 289.00,
        currency: 'UAH',
        stock: 50,
        isAvailable: true,
        description: 'Базовий конічний пуровер',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 9,
        variation: 'premium',
        sku: 'CONICAL-30-PREM',
        price: 449.00,
        currency: 'UAH',
        stock: 35,
        isAvailable: true,
        description: 'Пуровер + підставка',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 9,
        variation: 'deluxe',
        sku: 'CONICAL-30-DLX',
        price: 689.00,
        currency: 'UAH',
        stock: 20,
        isAvailable: true,
        description: 'Пуровер + підставка + сервер + 40 фільтрів',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 10: Сервер Samadoyo (base: 548 UAH)
    productItems.push(
      {
        productId: 10,
        variation: 'standard',
        sku: 'SAMADOYO-400-STD',
        price: 548.00,
        currency: 'UAH',
        stock: 28,
        isAvailable: true,
        description: 'Скляний сервер 400мл',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 10,
        variation: 'premium',
        sku: 'SAMADOYO-600-PREM',
        price: 698.00,
        currency: 'UAH',
        stock: 22,
        isAvailable: true,
        description: 'Збільшений сервер 600мл',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 10,
        variation: 'deluxe',
        sku: 'SAMADOYO-SET-DLX',
        price: 1148.00,
        currency: 'UAH',
        stock: 15,
        isAvailable: true,
        description: 'Набір: сервер 600мл + кришка + 2 чашки',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 11: Chemex 8 Cup (base: 2499 UAH)
    productItems.push(
      {
        productId: 11,
        variation: 'standard',
        sku: 'CHEMEX-8CUP-STD',
        price: 2499.00,
        currency: 'UAH',
        stock: 14,
        isAvailable: true,
        description: 'Великий кемекс на 8 чашок',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 11,
        variation: 'premium',
        sku: 'CHEMEX-8CUP-PREM',
        price: 2999.00,
        currency: 'UAH',
        stock: 9,
        isAvailable: true,
        description: 'Кемекс + 100 оригінальних фільтрів FS-100',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 11,
        variation: 'deluxe',
        sku: 'CHEMEX-8CUP-DLX',
        price: 3499.00,
        currency: 'UAH',
        stock: 5,
        isAvailable: true,
        description: 'Кемекс + фільтри + скляна кришка + набір чашок',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    // Product 12: Набір Chemex 3 Cup + Фільтри (base: 2785 UAH)
    productItems.push(
      {
        productId: 12,
        variation: 'standard',
        sku: 'CHEMEX-KIT-3-STD',
        price: 2785.00,
        currency: 'UAH',
        stock: 12,
        isAvailable: true,
        description: 'Базовий набір: кемекс 3 cup + фільтри FP-2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 12,
        variation: 'premium',
        sku: 'CHEMEX-KIT-3-PREM',
        price: 3285.00,
        currency: 'UAH',
        stock: 8,
        isAvailable: true,
        description: 'Розширений набір + додаткові фільтри + чашка',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 12,
        variation: 'deluxe',
        sku: 'CHEMEX-KIT-3-DLX',
        price: 3885.00,
        currency: 'UAH',
        stock: 4,
        isAvailable: true,
        description: 'Повний набір баристи + кемекс + фільтри + посуд + аксесуари',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    await queryInterface.bulkInsert('product_items', productItems, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_items', null, {});
  }
};
