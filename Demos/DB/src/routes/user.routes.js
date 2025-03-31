// imports
const router = require('express').Router();
const userController = require('../controllers/user.controller')

//routes
router.post('/register',userController.register);

//On utilise la méthode post du formulaire! On ne veut pas que les données soient dans l'url!
router.post('/login', userController.login);

//Export du module
module.exports = router;