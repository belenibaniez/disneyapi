'use strict';
const {
  Model
} = require('sequelize');
module.exports =  (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.belongsToMany(models.Movie,{foreignKey:'character_id',through:'movie_character'});
    
    }
  };
  Character.init({
    name: DataTypes.STRING,
    age: DataTypes.NUMBER,
    imgUrl: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    story: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Character',
  });
 
  return Character;
};

// await queryInterface.sequelize.query("ALTER TABLE table_name AUTO_INCREMENT = 1000000;");
