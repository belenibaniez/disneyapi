const {response} = require('express');
const bcrypt=require('bcryptjs')
const User= require('../models').User
const {getToken,getTokenData}=require('../config/jwt.config');
const sendMAilWelcome =require('../helpers/send-mail');
const user = require('../models/user');
/* User login function  */

const login= async(req,res=response)=> {

    const {email, password}= req.body;
    try{

        const user =await User.findOne({where:{email:email.toLowerCase()}});

        if(!user){
            return res.status(401).json({
                success:false,
                message: 'Login failed, try again',
                errors:[{
                    msg:'The email or password is incorrect.'}]

            })
        }
        if(!user.status){
            return res.status(401).json({
                success:false,
                message: 'Login failed, try again',
                errors:[{
                    msg:'The email or password is incorrect.'}]})
        }

        

        const validPasword= bcrypt.compareSync(password,user.password)
        if(!validPasword){
            return res.status(401).json({
                success:false,
                message: 'Login failed, try again',
                errors:[{
                    msg:'The email or password is incorrect.'}]
            })
        }

        if(!user.verified){
            return res.status(401).json({
                success:false,
                message: ' login failed, try again',
                errors:[{
                    msg:'The email is not verified.'}]
            })
        }

       const token= await getToken( user.uuid );
       delete user.dataValues["password"]

       res.json({
            success:true,
            data: {user, token},
            
       })

        
    }catch(error){
        console.log(error)   
        res.status(500).json ({
            success:false,
            message:'Comunicate con el administrador'
           }
    )}

  
}





/* User registration function  */


const register = async(req, res=response)=> {
   
    const  {name,lastname,email,password}=req.body;

    const salt=bcrypt.genSaltSync();
    newPassword=bcrypt.hashSync(password,salt);


try{
    const createdUser=await  User.create({
        name:name.toUpperCase(), 
        lastname:lastname.toUpperCase(),
        email:email.toLowerCase(),
        password:newPassword
    },{
        field:['name','lastname','email','password']
    });
    delete createdUser.dataValues["password"]


    const token= await getToken( createdUser.uuid );

    if (token){
        sendMAilWelcome(email, name, token)
        res.status(201).json({
            success:true,
            message:'User created, waiting for email confirmation',
            data:{user:createdUser,token}
        })
    }


}catch(e){
    res.status(500).json({
        success:false,
        message:'Error creating new user',
    })
    console.log(e)
}
   
}



const verify= async(req,res)=> {
    const { token } = req.params
    try{

        const dataUser= getTokenData(token)
        if(!dataUser){

            return res.status(403).json({
                success:false,
                message:"'Sorry, something went wrong'",
                errors:[{values:token,
                    msg:"error getting token"}]
               
            })
        }

        let userfind = await User.findOne({where:{
            uuid:dataUser.uuid}})  //ver como hacer q salan esas claves

        if (!userfind){
            return res.status(403).json({
                success:false,
                message:"Token is incorrect",
                errors:[
                    {values:token,
                msg: "The token invalid"

                    }
                ]
               
            })
        }

        if(userfind.verified){
            return res.status(403).json({
                success:false,
                message:"The user already verified",
               
            })


        }


        userfind.verified=true
        await userfind.save()
            if (user){
                res.status(200).json({
                    success:true,
                    message:"User verified",
                    "data": user
                   
               })

            }


    }catch(e){

        res.status(500).json({
            success:false,
            message:'Error verifieding new user',
        })
        console.log(e)
    }
    

}



const forwarding = async(req, res=response)=> {
    const {email, password}= req.body;

try{
  
    const user =await User.findOne({where:{email:email.toLowerCase()}});

    if(!user){
        return res.status(401).json({
            success:false,
            message: 'Forwarding failed, try again',
            errors:[{
                msg:'The email or password is incorrect.'}]

        })
    }
    if(!user.status){
        return res.status(401).json({
            success:false,
            message: 'Forwarding failed, try again',
            errors:[{
                msg:'The email or password is incorrect.'}]})
    }

    

    const validPasword= bcrypt.compareSync(password,user.password)
    if(!validPasword){
        return res.status(401).json({
            success:false,
            message: 'Login failed, try again',
            errors:[{
                msg:'The email or password is incorrect.'}]
        })
    }

    if(!user.verified){

        const token= await getToken( user.uuid );
        sendMAilWelcome(email, user.name, token)

        res.status(200).json({
            success:true,
            message:"Verification email was sent",
           
       })



    }



   

}catch(e){
    res.status(500).json({
        success:false,
        message:'Error creating new user',
    })
    console.log(e)
}
   
}


module.exports={ login , register, verify, forwarding};