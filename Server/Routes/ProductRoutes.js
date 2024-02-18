const express = require('express')
const router=express.Router()
const { createProductController, updateProductController, getProductController, getSingleProductController, deleteProductController } = require('../Controllers/productController')
const { requireSignIn, isAdmin } = require('../Middleware/authMiddleware')

//routes
//create product|| post method
router.post('/create-product',requireSignIn,isAdmin,createProductController)

//update product|| put method
router.put("/update-product/:id",requireSignIn, isAdmin,updateProductController);

//get products ||get method
router.get("/get-product", getProductController);

//get single product || get method 
router.get("/get-product/:slug", getSingleProductController);

// //get image
// router.get("/product-photo/:pid", productPhotoController);

//delete product ||delete method
router.delete("/product/:id", deleteProductController);


module.exports= router