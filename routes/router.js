const express = require('express')
const userController = require('../controllers/userController')
const bookController  = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const router = new express.Router()



router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.post('/google-login',userController.googleLoginController)


//home books
router.get('/home/books',bookController.getHomeBookController)



//----------------------Authorised user-------------------


//add book
router.post('/user/add/book',jwtMiddleware,multerMiddleware.array('uploadImg',3),bookController.addBookController)
module.exports = router