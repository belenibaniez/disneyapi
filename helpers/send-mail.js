const res = require("express/lib/response")
const sgMail=require('../services/sendGrid')
const getTemplate= require('../helpers/getTemplate')




const sendMAilWelcome= async (mail, name,token, sandbox_mode=false)=>{
const msg={
    to:mail,
    from:process.env.TO_EMAIL,
    subject: "Welcome To Disney Api",
    html: getTemplate(name, token),
    mail_settings:{
        sandbox_mode:{
            enable:sandbox_mode
        }
    }
}


try{
 await sgMail.send(msg)
}catch(e){
    console.log(e)
}

}

module.exports=sendMAilWelcome