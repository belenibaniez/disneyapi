'use strict';
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const fs=require('fs');
const path = require('path');

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


     const genres = require('../data/genre.json')
     let genreArray=[]
     genres.forEach(async (genre) => {

  

      genreArray.push({
         id:genre['id'],
         name:genre['name'].toUpperCase() ,
         imgUrl: process.env.HOST+':'+process.env.PORT+ '/genres/img/' +genre['id']  
    
        });
     })
     
     const result=await queryInterface.bulkInsert('Genres', genreArray)

     await sequelize.query(`ALTER  SEQUENCE  "Genres_id_seq" RESTART  with 11;`)
     
   
     return result

  },
  

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return await queryInterface.bulkDelete('Genres', null)

  }
};
