'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tags', 'taskId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow null initially
      references: {
        model: 'Tasks', // Ensure this matches the actual table name
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tags', 'taskId');
  }
};
