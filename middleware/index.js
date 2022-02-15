

const  validateField =require('../middleware/validate-field')
const validateData= require('./validate-data')

const validateJWT= require('../middleware/validate-jwt')
const validateUploadFile= require('../middleware/valid-uploadfile')

module.exports=
{
...validateField,
...validateData,
...validateJWT,
...validateUploadFile
}