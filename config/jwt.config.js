const jwt = require('jsonwebtoken')

const getToken = (uuid)=>{
    return new Promise( (resolve, reject) => {
        const payload={uuid};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,  {
            expiresIn:'4h'
        },
        (err,token ) => {

            if (err){
                console.log(err);
                reject('No se pudo generar el token');
            }
            else{
                resolve(token);
            }
        })


    })

}



const getTokenData=(token)=> {
    try{

        let data=null
        jwt.verify(token,process.env.SECRETORPRIVATEKEY, (err,decoded)=>{
           if(err){
               console.log(err)
           }
           else{
               data=decoded
           }
        })
        return data

    }catch(e){
        console.log(e)
    }


     
}


module.exports={getToken, getTokenData}