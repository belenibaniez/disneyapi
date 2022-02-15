const Character = require('../models').Character
const Movie = require('../models').Movie
const path = require('path')
const fs = require('fs')
const { uploadFile, getQueryCharacter, getQueryMovie } = require('../helpers')



const addCharacter = async (req, res) => {     
    try {
        const {id, status, createdAt,updatedAt,imgUrl,... body} = req.body;
        const name = body.name.toUpperCase();
        
        const newCharacter = await Character.create({ name, age: body.age, weight: body.weight, story: body.story }, { fields: ['name', 'age', 'weight', 'story'] })
        res.status(201).json({

            success:true,
            message:"Character created successfully",
            data: newCharacter
        }
        )
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Sorry, something went wrong'
        })
        }
}



const addMovieToCharacter=async(req,res)=>{
    const {movies} = req.body;
    const { id } = req.params
    try{
        const character=await Character.findByPk(id)

        moviesWithUpperCase = movies.map(function (movie) {
            
            movie.title = movie.title.toUpperCase()
            return movie
        })
        const newMovies = await Movie.bulkCreate(moviesWithUpperCase)
        await character.addMovies(newMovies)

        res.status(201).json({

            success:true,
            message:"Movies created successfully",
            data: await character.getMovies()
        })

    }catch(e){
        console.log(e)

        res.status(500).json({
            success:false,
            message: 'Sorry, something went wrong'
        })  
    }



}

const addMovieToCharacterWithIdMovie=async(req,res)=>{
    const { id_character, id_movie } = req.params
    try{
        const character=await Character.findByPk(id_character)
        const movie=await Movie.findByPk(id_movie)

    
        await character.addMovies(movie)



        res.status(201).json({

            success:true,
            message:"Movies added successfully",
            data: await character.getMovies()
        })


    }catch(e){
        console.log(e)

        res.status(500).json({
            success:false,
            message: 'Sorry, something went wrong'
        })  
    }



}





const deleteMovieCharacter=async(req,res)=>{
    const { id_character , id_movie} = req.params
    try{
        console.log('llega aqui')
        const character=await Character.findByPk(id_character)
        const movie = await Movie.findByPk(id_movie)
        await character.removeMovie(movie)


        res.status(201).json({

            success:true,
            message:"Movie deleted successfully",
            data: await character.getMovies()
        })


    }catch(e){
        console.log(e)

        res.status(500).json({
            success:false,
            message: 'Sorry, something went wrong'
        })  
    }



}


const uploadCharacter = async (req, res) => {
    const { id } = req.params;
    try {
         await uploadFile(req.files, id, 'characters')
         .then( async nombre =>{

            const nombreCortado = nombre.split('.');
            let imgUrl= process.env.HOST+':'+process.env.PORT + '/characters/img/' + nombreCortado[0] 

            const character = await Character.update({ imgUrl },
                { where: { id } })
    
    
            if (character == 1) {
                
                res.status(200).json({
                    success:true,
                    message: 'File uploaded succesfull',
                    data: imgUrl
                })
    
            } else {
                res.status(500).json({
                    success:false,
                    message: 'Sorry, something went wrong'
                })
    
            }

         })
        .catch(err=>{
            console.log(err)

            res.status(400).json({
                success:false,
                message: err
            })

        })
      
 


    } catch (err) {
        console.log(err)

        res.status(500).json({
            success:false,
            message: 'Sorry, something went wrong'
        })
    }


}






const searchCharacter = async (req, res) => {
  
    const { limit=5, offset=0 } =  req.query;
   
 
     const queryCharacter = getQueryCharacter(req.query)
     const queryMovie = getQueryMovie(req.query)
 
 try{
 
     const characters = await Character.findAll({
         limit,
         offset,
         attributes: ['id', 'name', 'imgUrl'],
         where: {
             status: true,
             ...queryCharacter
         },
 
         include: [{
             model: Movie,
             where: queryMovie,
             attributes: [],
             required:false
 
 
         }],
 
 
     })
 
 
     res.json({
         success:true,
         data:{
             count:characters.length,
             characters
         }
         
     })
 
 }catch(e){
 console.log(e)
     res.status(500).json({
         success:false,
         message: 'Sorry, something went wrong'
        })
 }
    
 
 }





     const showCharacter = async (req, res = response) => {

        const { id } = req.params;
    
        const pathImagen = path.join(__dirname, '../uploads/characters/', `${id}.jpg`)
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    
        const placeholder = path.join(__dirname, '../assets/no-image.jpg')
        return res.sendFile(placeholder)
    
    
    }
    
    
    const updateCharacter = async (req, res = response) => {
        const { id } = req.params;
        const { status, imgUrl,createdAt,updatedAt, ...body } = req.body;
        try{
        if (Object.keys(body).length>0){
            if (body.name) {
                body.name = body.name.toUpperCase();
            }
    
                let character = await Character.findByPk(id)  //ver como hacer q salan esas claves
                await character.update(body)
                res.status(200).json(
                    {
                        success:true,
                        message:'Character updated successfully',
                        data:{
                            character
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
    
    
    const deleteCharacter = async (req, res = response) => {
        const { id } = req.params;
    try{
        let character = await Character.findByPk(id)  //ver como hacer q salan esas claves
        character = await character.update({ status: false })
    
        res.json({
            success:true,
            message:'Character deleted successfully',
            data:{
                character
            }      })
    
    
    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Sorry, something went wrong'
        })
    
       
    
    }
    }
    
    
    
    const characterDetails = async (req, res) => {
        const { id } = req.params
    
        const character = await Character.findAll({
    
            where: {
                status: true,
                id
            },
            attributes: ['id', 'name', 'age', 'weight', 'imgUrl', 'story'],
    
            include: [{
                model: Movie,
                attributes: ['id','title', 'year', 'score', 'imgUrl'],
                through: { attributes: [] }
            }],
    
        })
        res.json({
            success:true,
            data:{
                character
            }
            
        })
    
    }
    
    module.exports = {
        addCharacter, uploadCharacter, searchCharacter,
        showCharacter, updateCharacter, deleteCharacter, characterDetails, addMovieToCharacter,addMovieToCharacterWithIdMovie, deleteMovieCharacter
    }
    
