'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ActionsGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ActionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Action', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      GroupId: {
        type: Sequelize.INTEGER,
        references: { model: 'Group', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
