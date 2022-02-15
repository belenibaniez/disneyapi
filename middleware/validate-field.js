const {validationResult}= require('express-validator')


const validateField=(req,res, next) =>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(
            {
            success:false,
            message: "Validation Failed",
            errors:errors.errors

        }
           );
    }
    next();

}





module.exports={
    validateField
}