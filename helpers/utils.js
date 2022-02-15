const User= require('../models').User
const Character= require('../models').Character
const Movie= require('../models').Movie
const Genre= require('../models').Genre
const Movie_character= require('../models').movie_character


const Genre_movie= require('../models').genre_movie

const existMoviesRepeated= (movies )=>{
    moviesMap=  movies.map(movie=>{
        return [JSON.stringify(movie.title.toUpperCase()+movie.year), movie]
    })
    let moviesMapArr = new Map(moviesMap);
    let  duplicado= [...moviesMapArr.values()]

    if (duplicado.length!=movies.length){
            return true
    }

    return false

    
}

const existCharacterRepeated= (characters )=>{
    characterMap=  characters.map(character=>{
        return [JSON.stringify(character.name.toUpperCase()), character]
    })
    let characterMapArr = new Map(characterMap);
    let  duplicado= [...characterMapArr.values()]

    if (duplicado.length!=characters.length){
            return true
    }

    return false

    
}





const existCharacterByName= async(name )=>{
    const character= await Character.findOne(
        {
        where:{
            name:name.toUpperCase(),
         status:true}
        });
    if (!character){
            return false
    }
    return true

    
}



const existMovieByTitleYear= async(title,year )=>{

    const movie= await Movie.findOne(
        {
        where:{
            title:title.toUpperCase(),
            year,
         status:true}
        });
    if (!movie){
            return false
    }
    return true

    
}



const existBelongToMovieCharacter= async(movie_id,character_id)=>{
    const moviecharacter = await Movie_character.findOne( {where:{movie_id, character_id}})

    if (!moviecharacter){
            return false
    }
    return true

    
}

const existBelongToGenreMovie= async(movie_id,genre_id)=>{
    const genremovie = await Genre_movie.findOne( {where:{movie_id, genre_id}})

    if (!genremovie){
            return false
    }
    return true

    
}



module.exports={existCharacterByName, existBelongToMovieCharacter,
     existMoviesRepeated,
      existMovieByTitleYear,
      existBelongToGenreMovie,
      existCharacterRepeated}