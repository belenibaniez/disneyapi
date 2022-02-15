'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('genre_movies', {
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
      genre_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'Genres', key:'id',
        },
        onDelete:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:  Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('genre_movies');
  }
};