'use strict';
const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const movie_characters = require('../data/movie-characters.json')
     let movie_charactersArray=[]
     movie_characters.forEach((movie_character) => {
      movie_charactersArray.push({
        movie_id:movie_character['movie_id'],
        character_id: movie_character['character_id'],
        createdAt: new Date(),
        updatedAt: new Date()
       })
      
     });


     return  await queryInterface.bulkInsert('movie_characters', movie_charactersArray)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return await queryInterface.bulkDelete('movie_characters', null)

  }
};
