'use strict';
const bcrypt=require('bcryptjs')
const salt=bcrypt.genSaltSync();
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../models");

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

     await queryInterface.bulkInsert('Users', [
      {
      // uuid:sequelize.Utils.generateUUID(),
        name:'Administrador'.toUpperCase(),
        lastname:null,
        email:'admin@gmail.com'.toUpperCase(),
        password:bcrypt.hashSync('password',salt),
        status:true,
        verified:true,
        createdAt: new Date(),
        updatedAt: new Date()
        
       },
       {
      // uuid:sequelize.Utils.generateUUID(),
      name:'userDelete'.toUpperCase(),
       lastname:null,
       email:'testdelete@gmail.com'.toUpperCase(),
       password:bcrypt.hashSync('password',salt),
       status:false,
       verified:true,
       createdAt: new Date(),
       updatedAt: new Date()
       
      },
      {
        // uuid:sequelize.Utils.generateUUID(),
        name:'userNotVerify'.toUpperCase(),
         lastname:null,
         email:'testNotVerify@gmail.com'.toUpperCase(),
         password:bcrypt.hashSync('password',salt),
         status:false,
         verified:false,
         createdAt: new Date(),
         updatedAt: new Date()
         
        }
     


    ],{})
  },

  down: async (queryInterface, Sequelize) => {

    return await queryInterface.bulkDelete('Users', null)

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
