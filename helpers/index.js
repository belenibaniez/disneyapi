

const generateJWT= require('../helpers/generate-jwt')
const validData= require('../helpers/validate-data')
const utils= require('../helpers/utils')

//const generateMovies= require('./generate-movie')
//const generateCharacter= require('./generate-character')
const uploadFile=require('./upload-file')

const createQuery=require('./generate-query')

module.exports={
    ...generateJWT,
    ...validData,
    //...generateMovies,
    //...generateCharacter,
    ...uploadFile,
    ...createQuery,
    ...utils
}