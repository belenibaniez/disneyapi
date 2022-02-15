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
     const characters = require('../data/character.json')
     let characterArray=[]
     characters.forEach((character) => {
      characterArray.push({
         id:character['id'],
         name:character['name'].toUpperCase(),
         age: character['age'],
         weight:character['weight'],
         imgUrl:character['imgUrl'],
         createdAt: new Date(),
         updatedAt: new Date()
       })
      
     });
     
     const result=await queryInterface.bulkInsert('Characters', characterArray)
     await sequelize.query(`ALTER  SEQUENCE  "Characters_id_seq" RESTART  with 50;`)

   
     return result
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     * 
     */
     return await queryInterface.bulkDelete('Characters', null)

  }
};
