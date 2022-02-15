
const Character = require('../models').Character
const Movie_character = require('../models').movie_character
const {existCharacterByName, existBelongToMovieCharacter, existMoviesRepeated, existMovieByTitleYear, existBelongToGenreMovie, existCharacterRepeated} = require('../helpers')


/*Validation of character */
const characterNotExistByName = async (req, res, next) => {
    const { characters } = req.body;
    const { name } = req.body;
    try {
        if(characters){

            if (characters.length > 0) {

               let existing = await Promise.all(characters.map( async(c) => {
                   let  exist = await existCharacterByName(c.name)
                    return exist
                }))
                if(existing.filter(bool=>{if (bool){return bool}}).length>0){
                    return res.status(401).send({
                        success:false,
                        message: `Some of the characters already exists`,
                        errors:characters
                    })
                }
                next()    
                    
                }
        }
        if(name){
            existing= await existCharacterByName(name)
            if(existing) {
                    return res.status(401).send({
                        success:false,
                        message: `The character already exists`,
                        errors:name
                    })
                }

            next()

        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Sorry, something went wrong'
        })
    }

}



const isMovieNotRepeated =  (req, res, next) => {
    const { movies } = req.body;
    if (  existMoviesRepeated(movies)){
        return res.status(401).json({
            success:false,
            message: `There are repeated movies`,
            errors: [{
                "value":'movies',
                "message":`There are repeated movies`
                }]
    })}

    next()


}
const isCharacterNotRepeated =  (req, res, next) => {
    const { characters } = req.body;
    if ( existCharacterRepeated(characters)){
        return res.status(401).json({
            success:false,
            message: `There are repeated characters`,
            errors: [{
                "value":'characters',
                "message":`There are repeated characters`
                }]
    })}

    next()


}



const notExistMovieInCharacter = async (req, res, next) => {
    const { id_character, id_movie } = req.params;
    if (id_character&& id_movie) {

        try {
            const existing= await existBelongToMovieCharacter(id_movie,id_character)
            if (existing){
                return res.status(401).json({
                    success:false,
                    message: `The character is already associated with the movies`,
                    errors: [{
                        "value":'id_movie,id_character',
                        "message":`The character is already associated with the movies`
                        }]
            })}
            next();

        } catch (e) {
            console.log(e)
            res.status(500).json({
                success:false,
                message: 'Sorry, something went wrong'
            })
        }

    } else {
        next();
        
    }

}




const existCharactersByName = async (req, res, next) => {
    const { characters = [] } = req.body;



    if (characters) {

        name_character = characters.map(function (character) { return character.name.toUpperCase() })
        const findCharacter = await Character.findAll({
            where: {
                title: name_character
            }

        });

        if (findCharacter.length > 0) {
            return res.status(400).json({
                msg: `Some of the character already exists:  ${name_character}`
            })
        }


    }
    next();



}


const existMovieInCharacter = async (req, res, next) => {
    const { id_character, id_movie } = req.params;

    if (id_character) {

        try {
            const moviecharacter = await Movie_character.findOne( {where:{movie_id:id_movie, character_id:id_character}})
            if (!moviecharacter){

                return res.status(401).json({
                    success:false,
                    message: `The movie does not belong to the character`,
                    errors: [{
                        "value":id_movie,
                        "message":`the movie does not belong to the character`
                        }]
            })}

            

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                success:false,
                message: 'Sorry, something went wrong'
            })
        }



    } 

        next();

}




const notExistMoviesByTitle = async (req, res, next) => {
    const { movies, title ,year} = req.body;
    try {
        if(movies){
        if (movies.length > 0) {
           let   existing= await  Promise.all( movies.map(async (movie) => {
                let exist=await existMovieByTitleYear(movie.title,movie.year)
                return exist
            }))
            
        if(existing.filter(bool=>{if(bool){return bool}}).length>0){
            return res.status(401).send({
                success:false,
                message: `The movie already exists`,
                errors:movies
            })
        }
        next()

        
    }}
    if(title&&year){

        existing= await existMovieByTitleYear(title,year)
            if(existing) {
                    return res.status(401).send({
                        success:false,
                        message:`The movie already exist`,
                        errors:title
                    })
                }

            next()

    }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Sorry, something went wrong'
        })
    }
}





const notExistGenreInMovie = async (req, res, next) => {
    const { id_genre, id_movie } = req.params;
    if (id_genre&& id_movie) {

        try {
            const existing= await existBelongToGenreMovie(id_movie,id_genre)
            if (existing){
                return res.status(401).json({
                    success:false,
                    message: `The Genre is already associated with the movies`,
                    errors: [{
                        "value":'id_movie,id_genre',
                        "message":`The Genre is already associated with the movies`
                        }]
            })}
            next();

        } catch (e) {
            console.log(e)
            res.status(500).json({
                success:false,
                message: 'Sorry, something went wrong'
            })
        }

    } else {
        next();
        
    }

}

const existGenreInMovie = async (req, res, next) => {
    const { id_genre, id_movie } = req.params;

    if (id_genre&& id_movie) {

        try {
            const existing= await existBelongToGenreMovie(id_movie,id_genre)
            if (!existing){

                return res.status(401).json({
                    success:false,
                    message: `The genre does not belong to the movie`,
                    errors: [{
                        "value":id_genre,
                        "message":`the genre does not belong to the movie`
                        }]
            })}

            

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                success:false,
                message: 'Sorry, something went wrong'
            })
        }



    } 

        next();

}





module.exports = {
    notExistMoviesByTitle,
    characterNotExistByName,
    existCharactersByName,
    existMovieInCharacter,
    notExistMovieInCharacter,
    isMovieNotRepeated,
    notExistGenreInMovie,
    existGenreInMovie,
    isCharacterNotRepeated

}