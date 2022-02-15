'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie_character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    }
  };
  movie_character.init({
    movie_id: DataTypes.INTEGER,
    character_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movie_character',
  });
  return movie_character;
};