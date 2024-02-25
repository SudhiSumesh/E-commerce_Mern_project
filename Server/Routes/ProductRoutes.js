const express = require('express')
const router=express.Router()
const { createProductController, updateProductController, getProductController, getSingleProductController, deleteProductController, searchProductController } = require('../Controllers/productController')
const { requireSignIn, isAdmin } = require('../Middleware/authMiddleware')
const { upload } = require('../Middleware/Multer')

//routes
//create product|| post method
router.post('/create-product',requireSignIn,isAdmin,upload.array('file',3),createProductController)

//update product|| put method
router.put("/update-product/:id",requireSignIn, isAdmin,updateProductController);

//get products ||get method
router.get("/get-product", getProductController);

//get single product || get method 
router.get("/get-product/:slug", getSingleProductController);

// //get image
// router.get("/product-photo/:pid", productPhotoController);

//delete product ||delete method
router.delete("/delete-product/:id", deleteProductController);

//product search || get method
router.get('/search/:keyword',searchProductController)


module.exports= router