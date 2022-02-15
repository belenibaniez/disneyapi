

const { Op } = require("sequelize");

const { Character } = require('../models');


const getQueryCharacter=(params)=>{
const query={}
    if (params.name){
        query.name={
            [Op.like]:`%${params.name.toUpperCase()}%`
        }
    }
    if (params.age){
        query.age=params.age
    }
    if (params.weight){
        query.weight=params.weight
    }
    

    return query
}


const getQueryMovie=(params)=>{
    const query={}
      
        if (params.id_movie){
            query.id={ [Op.eq]: params.id_movie}
        }

        if(params.title){
            query.title={
                [Op.like]:`%${params.title.toUpperCase()}%`
            }
        }

        return query
    }




    const getQueryGenre=(params)=>{
        const query={}

    
            if (params.genre && isNaN(params.genre)){
                query.name={
                    [Op.like]:`%${params.genre.toUpperCase()}%`
                }
            }
          
            if (params.genre&& !isNaN(params.genre)){
                query.id=params.genre
                 
        
            
        
        }
        return query

    }

module.exports={getQueryCharacter,getQueryMovie,getQueryGenre }