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
     const genre_movies = require('../data/movie-genre.json')
     let genre_movieArray=[]
     genre_movies.forEach((genre_movie) => {
      genre_movieArray.push({
        id:genre_movie['id'],
        movie_id:genre_movie['movie_id'],
        genre_id: genre_movie['genre_id'],
         createdAt: new Date(),
         updatedAt: new Date()
       })
      
     });
     const result=await queryInterface.bulkInsert('genre_movies', genre_movieArray)
     await sequelize.query(`ALTER  SEQUENCE  "genre_movies_id_seq" RESTART  with 50;`)

   
     return result
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return await queryInterface.bulkDelete('genre_movies', null)

  }
};
