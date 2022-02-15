const Character= require('../models').Character
const Movie= require('../models').Movie
const Genre= require('../models').Genre
const path = require('path')
const fs = require('fs')

const  {uploadFile,getQueryGenre,getQueryMovie}= require('../helpers')

const addMovie = async (req, res) => {
    try{
        const movie = req.body;
        const title = req.body.title.toUpperCase();
    
      
           const newMovie=await Movie.create({ title,score:movie.score,year:movie.year}, {fields:['title','score','year']})

           res.status(201).json(

            {

                success:true,
                message:"Movie Created successfully",
                data: newMovie
    
            }
            
            )
    
        }catch(e){
            console.log(e)
            res.status(500).json({
                success:false,
                message: 'Something goes wrong'
            })
        }

    
}



const addCharacterMovie=async(req,res)=>{
    const {characters} = req.body;
    const { id } = req.params
    try{
        const movie=await Movie.findByPk(id)

        charactersWithUpperCase = characters.map(function (character) {
            
            character.name = character.name.toUpperCase()
            return character
        })
        const newCharacter = await Character.bulkCreate(charactersWithUpperCase)
        await movie.addCharacters(newCharacter)


        res.status(201).json({

            success:true,
            message:"Characters created and added successfully",
            data: await movie.getCharacters()
        })


    }catch(e){
        console.log(e)

        res.status(500).json({
            success:false,
            message: 'Something goes wrong'
        })  
    }



}



const addGenresMovie=async(req,res)=>{
    const { id_movie, id_genre } = req.params
    try{
        const movie=await Movie.findByPk(id_movie)

        
        await movie.addGenre(id_genre)


        res.status(201).json({

            success:true,
            message:"Genre added successfully",
            data: await movie.getGenres()
        })


    }catch(e){
        console.log(e)

        res.status(500).json({
            success:false,
            message: 'Something goes wrong'
        })  
    }



}


const uploadMovie = async (req, res) => {
    HOST = ""  //agregar dominio aqui
    const { id } = req.params;
     try {


            const nombre = await uploadFile(req.files, id,'movies')
            const nombreCortado=nombre.split('.');

            let imgUrl= HOST + '/movies/img/' + nombreCortado[0]

            const movie= await Movie.update({imgUrl}, 
            { where:{ id}})


            if (movie==1){
                res.json({
                    success:true,
                    message: 'File uploaded Succesfull',
                    data:movie
                })

            }else {
                res.status(500).json({
                    success:false,
                    message: 'Something goes wrong'
                })

            }
            

        } catch (err) {
            console.log(err)

            res.status(500).json({
                success:false,
                message: 'Something goes wrong'
            })        }


}


const searchMovie = async (req, res) => {
    let { limit = 5, offset = 0 ,order='ASC'} = req.query;

    const queryGenre = getQueryGenre(req.query)
    const queryMovie = getQueryMovie(req.query)
    console.log(queryGenre)


  try{
      if (!limit){
          limit=5    
      }
      if(!offset){
          offset=0
      }



 const movies= await Movie.findAll({
        order:[['createdAt', order  ]],
        limit,
        offset,
        attributes:['id','title','imgUrl','createdAt'] ,
    where:{status:true,
        ...queryMovie
    },

    include:[{
         model:Genre,
         required:true,
         where: queryGenre,
         attributes: [],
         through: {
            attributes: []
          }    }, 
    {
        model:Character,
        required:false,
        attributes: [],
        through: {
            attributes: []
          }    }], 


})
    
    res.json({success:true,
        data:{
            count:movies.length,
            movies
        }
        
    
    })

   
  }catch(e){
      console.log(e)
  }
   
    
}



const showMovie = async (req, res = response) => {

    const { id } = req.params;

    const pathImagen = path.join(__dirname, '../uploads/movies/', `${id}.jpg`)
    if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen)
    }

    const placeholder = path.join(__dirname, '../assents/no-image.jpg')
    return res.sendFile(placeholder)


}




const updateMovie= async (req, res = response) => {
    const { id } = req.params;
    const { status, imgUrl, characters,createdAt,updateAt, ...body } = req.body;

    try{
        if (Object.keys(body).length>0){
            if (body.title) {
                body.title = body.title.toUpperCase();
            }
        
            let  movie = await Movie.findByPk(id) 
            if (movie.status){
                movie=await movie.update(body)
            }
        
            res.status(200).json(
                {
                    success:true,
                    message:'Movie updated successfully',
                    data:{
                        movie
                    }   
                }
                )
        
        }
        else{
            res.status(400).json({
                success:false,
                message: 'No data to update'
            })

        }




    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Sorry, something went wrong'
        })
    }

    
}


const deleteMovieByID = async (req, res = response) => {
    const { id } = req.params;

    let  movie = await Movie.findByPk(id)  //ver como hacer q salan esas claves
    movie=await movie.update({status:false})
    if (movie){

        res.json({
            success:true,
            message:'Movie deleted successfully',
            data:{
                movie
            }      })

    }

  

}




const detailsMovies = async (req, res) => {
    const { id } = req.params

    try{

        const movies= await Movie.findOne({
      
            where:{status:true,
                id
            },
            attributes:['id','title','year','score','imgUrl'] ,
        
            include:[{
                model:Character,
                attributes:['name','age','weight','story','imgUrl'],
                where:{status:true},
                through: {attributes:[] }
             },
             {
                model:Genre,
                attributes:['id','name','imgUrl'],
                through: {attributes:[] }
             }]
                
        })
        
            res.json({
                success:true,
                data:{
                    movies
                }
                
            })

    }catch(e){
        console.log(e)

    }

   


}



const showGenreMovie = async (req, res) => {
    const {  id } = req.params

    try{

        const genres= await Genre.findByPk(id,{
            attributes:['id','name','imgUrl'],
    
             include:[{
                model:Movie,
                attributes:['id','title','year','score','imgUrl'],
                through: {attributes:[] }
             }]
                
        })
        
            res.json({
                success:true,
                data:{
                    count:genres.Movies.length,
                    genres
                }
                
            })

    }catch(e){
        console.log(e)

    }

   


}


const deleteGenreMovie=async(req,res)=>{
    const { id_movie , id_genre} = req.params
    try{
        const movie=await Movie.findByPk(id_movie)
        const genre = await Genre.findByPk(id_genre)
        await movie.removeGenre(genre)


        res.status(200).json({

            success:true,
            message:"Genre deleted successfully",
            data: await movie.getGenres()
        })


    }catch(e){
        console.log(e)

        res.status(500).json({
            success:false,
            message: 'Something goes wrong'
        })  
    }



}

const deleteCharacterMovie=async(req,res)=>{
    const { id_movie , id_character} = req.params
    try{
        const movie=await Movie.findByPk(id_movie)
        const character = await Character.findByPk(id_character)
        await movie.removeCharacter(character)


        res.status(200).json({

            success:true,
            message:"Character deleted successfully",
            data: await movie.getCharacters()
        })


    }catch(e){
        console.log(e)

        res.status(500).json({
            success:false,
            message: 'Something goes wrong'
        })  
    }



}



module.exports={addMovie, uploadMovie, searchMovie, showMovie,updateMovie, deleteMovieByID,detailsMovies, showGenreMovie, addCharacterMovie, addGenresMovie, deleteGenreMovie, deleteCharacterMovie}