
const path = require('path')
const fs = require('fs')
const Genre = require('../models').Genre

     const showGenre = async (req, res = response) => {

        const { id } = req.params;
    
        const pathImagen = path.join(__dirname, '../assets/genres/', `${id}.png`)
        console.log(pathImagen)
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    
        const placeholder = path.join(__dirname, '../assets/no-image.jpg')
        console.log(placeholder)
        return res.sendFile(placeholder)
    
    
    }


    const getGenres = async (req, res = response) => {

     const genres= await Genre.findAll()
    
     res.json({
        success:true,
        data:{
            count:genres.length,
            genres
        }
        
    })
    }


    module.exports={showGenre, getGenres}