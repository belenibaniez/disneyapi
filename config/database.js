const Sequelize=require('sequelize');
const fs = require('fs');
require ('dotenv').config();

module.exports = {
    development: {
      username:  process.env.DB_USER,
      password:  process.env.DB_PASSWORD,
      database:  process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port:  process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      
    },
    test: {
      username:  process.env.DB_USER,
      password: process.env.CI_DB_PASSWORD,
      database:  process.env.DB_DATABASE,
      host:process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
    
    },
    production: {
      username:  process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWORD,
      database:  process.env.PROD_DB_DATABASE,

      host: process.env.PROD_DB_HOSTNAME,
      port: process.env.PROD_DB_PORT,
      dialect:process.env.PROD_DB_DIALECT,
     
    }
  };


