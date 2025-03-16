'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove a coluna taskId da tabela Tags
    await queryInterface.removeColumn('Tags', 'taskId');
  },

  down: async (queryInterface, Sequelize) => {
    // Adiciona a coluna taskId de volta à tabela Tags (opcional, para rollback)
    await queryInterface.addColumn('Tags', 'taskId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};