const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middleware')
const { existGenreById} = require('../helpers')
const { showGenre , getGenres} = require('../controllers/genre')

const router = Router();

router.get('/', getGenres);


router.get('/img/:id',[ 
    check('id').isInt()
    .custom(existGenreById) ,
        validateField ],
 showGenre);





module.exports = router