'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tags', 'color', {
      type: Sequelize.STRING,
      defaultValue: '#FFFFFF', // Set default value for color
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tags', 'color');
  }
};
