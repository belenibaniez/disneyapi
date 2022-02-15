'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movie_characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movie_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'Movies', key:'id',
        },
        onDelete:'CASCADE'
      },
      character_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'Characters', key:'id',
        },
        onDelete:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

      }
    }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('movie_characters');
  }
};