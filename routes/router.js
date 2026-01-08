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

//----------------------role:user-------------------------
//add book
router.post('/user/add/book',jwtMiddleware,multerMiddleware.array('uploadImg',3),bookController.addBookController)


router.get('/home/books',bookController.getHomeBookController)

//allbook for loggined user

router.get('/all-books',jwtMiddleware,bookController.getUserAllBooksController)

router.get('/user-books',jwtMiddleware,bookController.getUserProfileBooksController)

router.get('/user-books/bought',jwtMiddleware,bookController.getUserBoughtBooksController)



router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)


router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.userProfileUpdateController)

module.exports = router