const express=require('express')
const router=express.Router()

router.route('/register').post()
router.route('/login').post()

// router.route('/logout').get()
// router.route('/password/forgot').post()
// router.route('/password/reset/:token').put()

module.exports=router