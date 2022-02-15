const {Router}=require('express');
const {check}=require('express-validator');
const { login, register, verify , forwarding} = require('../controllers/auth');
const {validateField } = require('../middleware');
const { isUniqueMail} = require('../helpers');

const router= Router()

router.post('/register', [
    check('lastname', 'The lastname is required').not().isEmpty(),
    check('name', 'The name is required').not().isEmpty()
    .isLength({ max: 50 }).withMessage('The name must have a maximum of 50 characters')
    .isString().withMessage('The name must be String'),
    check('email', 'The email is required').notEmpty(),
    check('email', 'The email must be an email').isEmail()
    .isLength({ max: 320 }).withMessage('The email must have a maximum of 320 characters'),
    check('password').notEmpty().withMessage('The password is required')
    .isLength({min:6}).withMessage('The story must have a minimum of 6 characters'),
    check('email').custom(isUniqueMail),
    validateField
], register);



router.post('/login', [
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must be an email').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateField

],login);



router.get('/confirm/:token', [
    check('token', 'The token is required').notEmpty()    
   .isJWT().withMessage( 'Format invalid token'),
    validateField
],verify);

router.get('/forwarding/', [
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must be an email').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateField
],forwarding);


module.exports=router