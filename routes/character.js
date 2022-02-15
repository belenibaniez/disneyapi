const { Router } = require('express');
const { check } = require('express-validator');
const { validateField, validateJWT,characterNotExistByName , notExistMovieInCharacter, notExistMoviesByTitle, validateUploadFile, existMovieInCharacter, isMovieNotRepeated } = require('../middleware')
const { characterDetails, addCharacter, uploadCharacter, searchCharacter, showCharacter, updateCharacter, deleteCharacter, addMovieToCharacter, deleteMovieCharacter, addMovieToCharacterWithIdMovie } = require('../controllers/character')
const { existCharacterID, existMovieByID } = require('../helpers');


const router = Router();

/*Add a new character */

router.post('/', [
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),
    validateField,
    validateJWT,
    check('name', "The name is required").notEmpty().isLength({ max: 50 }),
    check('age', "The age  must be numerical").optional({ nullable: true }).isNumeric(),
    check('weight', "The weight must be numerical").optional({ nullable: true }).isNumeric(),
    check('story', "The story must have a maximum of 255 characters").isLength({ max: 255 }),
    validateField,
    characterNotExistByName,
   
],
    addCharacter);


/*Add one or many new Movies to character */

    router.post('/:id_character/movies/:id_movie', [
        check('token', "The token is required").notEmpty(),
        check('token', "Format invalid token").isJWT(),
        validateField,
        validateJWT,
        check('id_character').custom(existCharacterID),
        check('id_movie').custom(existMovieByID),
        validateField,
        notExistMovieInCharacter,
        
    ],    addMovieToCharacterWithIdMovie);
    
    
/*Add an existing movie to the  character */


router.post('/:id/movies', [
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),
    validateField,
    validateJWT,
    check('id').custom(existCharacterID),
    check('movies',"the movies is required").notEmpty()
    .isArray().withMessage('the movies is a array'),
    check('movies.*.title',"the title is required").notEmpty(),
    check('movies.*.score',"score  must be numerical").isFloat().optional({ nullable: true }),
    check('movies.*.year',"year must be numerical").isNumeric().notEmpty(),
    validateField,
    isMovieNotRepeated,
    notExistMoviesByTitle,
    
],    addMovieToCharacter);




/*Upload character image*/
    router.post('/upload/:id', [
        check('token', "The token is required").notEmpty(),
        check('token', "Format invalid token").isJWT(),
        validateField,
        validateJWT,
        check('id').custom(existCharacterID),
        validateField,
        validateUploadFile
    ], uploadCharacter);


/*Get character details*/

    router.get('/:id', [
        check('id').isInt()
        .custom(existCharacterID) ,
        validateField
    ], characterDetails);

/*Search characters*/

    router.get('/', [
        check('age', "age  must be integer").isInt().optional({ nullable: true }),
        check('weight', "age  must be float").isFloat().optional({ nullable: true }),
        validateField
    ], searchCharacter);
    

    /*Show character image*/

    
    router.get('/img/:id',[ 
        check('id').isInt()
    .custom(existCharacterID) ,
    validateField ],
     showCharacter);
    
    
        /*update  character data*/

    router.put('/:id', [
        check('token', "The token is required").notEmpty(),
        check('token', "Format invalid token").isJWT(),
        validateField,
        validateJWT,
        check('id').isInt()
        .custom(existCharacterID) ,
        validateField
    
    ], updateCharacter)
    
    
    /*delete  character movie */

    router.delete('/:id_character/movies/:id_movie', [
        check('token', "The token is required").notEmpty(),
        check('token', "Format invalid token").isJWT(),
        validateField,
        validateJWT,
        check('id_character').custom(existCharacterID),
        check('id_movie').custom(existMovieByID),
        validateField,
        existMovieInCharacter
        
    ],    deleteMovieCharacter);

    /*delete  character  */

    router.delete('/:id', [
        check('token', "The token is required").notEmpty(),
        check('token', "Format invalid token").isJWT(),
        validateField,
        validateJWT,
        check('id')
        .isInt()
        .custom(existCharacterID),
        validateField
    
    ], deleteCharacter)
    


module.exports = router