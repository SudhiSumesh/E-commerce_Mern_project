const express=require('express')
const { registerController, loginController,testController } = require('../Controllers/authController')
const { requireSignIn, isAdmin } = require('../Middleware/authMiddleware')
const router=express.Router()

// routing
//REGISTER || POST METHOD
router.route('/register').post(registerController)

//LOGIN || POST METHOD
router.route('/login').post(loginController)

//test route
router.get('/test',requireSignIn,isAdmin, testController)

// router.route('/logout').get()
// router.route('/password/forgot').post()
// router.route('/password/reset/:token').put()

module.exports=router