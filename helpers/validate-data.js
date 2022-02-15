const User= require('../models').User
const Character= require('../models').Character
const Movie= require('../models').Movie
const Genre= require('../models').Genre


const isUniqueMail = async(email)=>{

    const mail= await User.findOne(
        { where:{email: email.toLowerCase()}
        });


    if(mail){
        throw new  Error(`Email already registered`)
    }
    return
    
}


    

    



const existCharacterID= async(id )=>{
    const character= await Character.findOne(
        {
        where:{
            id,
         status:true}
        });
    if (!character){
        throw new Error(`The Character with id: ${id}  does not exist`)

    }

    
}


const existMovieByID = async (id) => {
  
    const movie = await Movie.findByPk(id)

    if(!movie){
                throw new  Error(`Movie no existe`)
        }
        if(!movie.status){
            throw new  Error(`Movie no existe`)
    }

          

}


const existGenreById = async (id) => {
  
    const genre = await Genre.findByPk(id)

    if(!genre){
                throw new  Error(`The genre does not exist`)
        }
       

}






module.exports={ isUniqueMail, existCharacterID,existMovieByID,  existGenreById}