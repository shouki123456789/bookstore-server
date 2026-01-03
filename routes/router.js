const express = require('express')
const userController = require('../controllers/userController')
const bookController  = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const router = new express.Router()



router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.post('/google-login',userController.googleLoginController)


//----------------------Authorised user-------------------


//add book
router.post('/user/add/book',jwtMiddleware,bookController.addBookController)
module.exports = router