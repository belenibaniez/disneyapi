'use strict';

const { sequelize } = require("../models");
const {DataTypes}= require('sequelize');

module.exports = {

  up: async (queryInterface, Sequelize) => {
    Promise.all(  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'),
     
    
    await queryInterface.createTable('Users', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal( 'uuid_generate_v4()' )  
      },
      name: {

        type: Sequelize.STRING(50),
        allowNull: false 
        
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING(320),
        unique:true,
        allowNull: false 
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false 

      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:true,
        allowNull: false
      },
      verified:{
        type: Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull: false

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
    }  ));
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};