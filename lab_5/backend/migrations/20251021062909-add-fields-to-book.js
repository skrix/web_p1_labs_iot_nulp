'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Books', 'author', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Books', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('Books', 'genre', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Books', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Books', 'author');
    await queryInterface.removeColumn('Books', 'description');
    await queryInterface.removeColumn('Books', 'genre');
    await queryInterface.removeColumn('Books', 'image_url');
  }
};
