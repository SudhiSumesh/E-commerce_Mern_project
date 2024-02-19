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

// User protected route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).json({
        ok:true,
    })
})
//Admin protected route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
   try {
     res.status(200).json({
       ok: true,
     });
   } catch (error) {
    res.status(500).json({
        message:"errorr in auth",
        error
    })
   } 
})
// router.route('/logout').get()
// router.route('/password/forgot').post()
// router.route('/password/reset/:token').put()

module.exports=router