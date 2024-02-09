const express=require('express')
const { registerController, loginController } = require('../Controllers/authController')
const router=express.Router()

// routing
//REGISTER || POST METHOD
router.route('/register').post(registerController)
//LOGIN || POST METHOD
router.route('/login').post(loginController)

// router.route('/logout').get()
// router.route('/password/forgot').post()
// router.route('/password/reset/:token').put()

module.exports=router