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
     const movies = require('../data/movies.json')
     let moviesArray=[]
     movies.forEach((movie) => {
       moviesArray.push({
         id:movie['id'],
         title:movie['title'].toUpperCase(),
         year: movie['year'],
         score:movie['score'],
         imgUrl:movie['imgUrl'],
         createdAt: new Date(),
         updatedAt: new Date()
       })
      
     });
    
     const result=await queryInterface.bulkInsert('Movies', moviesArray)
     await sequelize.query(`ALTER  SEQUENCE  "Movies_id_seq" RESTART  with 50;`)

   
     return result
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return await queryInterface.bulkDelete('Movies', null)

  }
};
