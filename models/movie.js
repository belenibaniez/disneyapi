'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsToMany(models.Character,{foreignKey:'movie_id',through:'movie_character'});
      Movie.belongsToMany(models.Genre,{foreignKey:'movie_id',through:'genre_movie'});
  

    }
  };
  Movie.init({
    title: DataTypes.STRING,
    year: DataTypes.NUMBER,
    imgUrl: DataTypes.STRING,
    score: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};