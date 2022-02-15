const express = require('express')
const cors = require('cors')
const logger  = require('morgan');
const fileUpload = require('express-fileupload');
class Server{
    constructor (){
        this.app =express();
        this.port= process.env.PORT
     
        this.authPath='/auth'
        this.charactersPath='/characters'
        this.moviesPath='/movies'
        this.genrePath='/genres'

        //Middlewares

        this.middlewares()

        //rutas de la app

        this.routes();
    }


    middlewares(){
        //directorio publico
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true })); 
        this.app.use(express.json());

        this.app.use(fileUpload({
           useTempFiles : true,
          tempFileDir : '/tmp/',
         createParentPath:true
       }));

    }




    routes(){
       
        this.app.use( this.authPath, require('./routes/auth'))
        this.app.use( this.charactersPath, require('./routes/character'))
        this.app.use( this.moviesPath, require('./routes/movies'))
        this.app.use( this.genrePath, require('./routes/genres'))

        this.gnrePath
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Server on port 4000', this.port);
        });
    }



}

module.exports= Server