const { response } = require('express');
const jwt = require('jsonwebtoken');
const User= require('../models').User

const validateJWT= async (req,res=response,next) => {

    const token= req.params('token');
    if (!token){
        res.status(401).json({msg: 'The token is required' })
    }

    try{
       const {uid}= jwt.verify(token,process.env.SECRETORPRIVATEKEY)
       const user= await User.findByPk(uid)
      
       if (!user){
        return res.status(401).json({msg:'Username does not exist'})
    }

       if (!user.status){
           return res.status(401).json({msg:'Username does not exist'})
       }
       
    req.user=user;
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({msg:"Invalid token"})

    }
}


module.exports = {
    validateJWT
}