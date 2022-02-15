const {Router}=require('express');
const {check}=require('express-validator');
const{validateField, validateJWT,  notExistMoviesByTitle, validateUploadFile, characterNotExistByName, notExistMovieInCharacter,existMovieInCharacter,notExistGenreInMovie, existGenreInMovie, isCharacterNotRepeated}= require('../middleware')
const{addMovie, uploadMovie, searchMovie, showMovie, updateMovie, deleteMovieByID, detailsMovies, showGenreMovie, addCharacterMovie, addGenresMovie, deleteGenreMovie, deleteCharacterMovie}= require('../controllers/movies')
const {existMovieByID, existGenreById, existCharacterID} = require('../helpers')


const router= Router()


/*Add a new movie */

router.post('/',[
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),
    validateField,
    validateJWT,
    check('title',"The title is required").notEmpty(),
    check('score',"Score  must be numerical").isFloat().optional({ nullable: true }),
    check('year',"Year must be integer").isInt(),
    validateField,
    notExistMoviesByTitle,
  ] ,addMovie );


/*Add one or many new characters to  movie */
  router.post('/:id_movie/characters/:id_character',[
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),
    validateField,
    validateJWT,
    check('id_movie').custom(existMovieByID),
    check('id_character').custom(existCharacterID),
    validateField,
    notExistMovieInCharacter
  ] ,addCharacterMovie );

/*Add an existing character to the movie */

  router.post('/:id/characters',[
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),
    validateField,
    validateJWT,
    check('id').custom(existMovieByID),
    check('characters',"The characters is required").notEmpty(),
    check('characters.*.name', "The name is required").notEmpty().isLength({ max: 50 }),
    check('characters.*.age', "The age  must be numerical").optional({ nullable: true }).isNumeric(),
    check('characters.*.weight', "The weight  must be numerical").optional({ nullable: true }).isNumeric(),
    check('characters.*.story', "The story must have a maximum of 255 characters").isLength({ max: 255 }),
    validateField,
    characterNotExistByName,
    isCharacterNotRepeated
  ] ,addCharacterMovie );

/*Add a genre to  movie */

  router.post('/:id_movie/genres/:id_genre',[
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),
    validateField,
    validateJWT,
    check('id_movie').custom(existMovieByID),
    check('id_genre').custom(existGenreById),
    validateField,
    notExistGenreInMovie
    
  ] ,addGenresMovie );


  /*Upload character image*/


router.post('/upload/:id',[
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),
    validateField,
    validateJWT,
    check('id').custom(existMovieByID),
    validateUploadFile
    
] ,uploadMovie );


/*Get movie details*/

router.get('/:id',[
    check('id').custom(existMovieByID),

    validateField,

], detailsMovies)


/*Search Movies*/

router.get('/',[
    check('title', "title  must be string").isString().optional({ nullable: true }),
    validateField


],
 searchMovie);




router.get('/', searchMovie);


/*Get genre details*/

router.get('/genres/:id',[
    check('id').custom(existGenreById),
    validateField
],showGenreMovie);

/*show image movie*/


router.get('/img/:id',[
    check('id').custom(existMovieByID),
    validateField
], showMovie);


/*update a movie */
router.put('/:id',[
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),
    validateField,
    validateJWT,
    check('id').custom(existMovieByID),
    validateField

], updateMovie )


/*delete a movie */
router.delete('/:id',[
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),

    validateField,
    
   validateJWT,
    check('id').custom(existMovieByID),
    validateField

], deleteMovieByID )


/* delete character to movie */

router.delete('/:id_movie/characters/:id_character', [
  check('token', "The token is required").notEmpty(),
  check('token', "Format invalid token").isJWT(),
  validateField,
  validateJWT,
  check('id_movie').custom(existMovieByID),
  check('id_character').custom(existCharacterID),
  
  validateField,
  existMovieInCharacter
  
],  deleteCharacterMovie  );


/*delete genre to movie */
router.delete('/:id_movie/genres/:id_genre', [
    check('token', "The token is required").notEmpty(),
    check('token', "Format invalid token").isJWT(),

    validateField,
    validateJWT,
    check('id_movie').custom(existMovieByID),
    check('id_genre').custom(existGenreById),
    validateField,
    existGenreInMovie
],    deleteGenreMovie);


module.exports=router