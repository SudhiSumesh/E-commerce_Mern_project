const express= require('express')
const { requireSignIn, isAdmin } = require('../Middleware/authMiddleware')
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../Controllers/CategoryController')
const router=express.Router()

//routing
//Create Category||post method
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//Update Category||put method
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//Get All Category||get method
router.get("/show-category", requireSignIn, isAdmin, categoryController);

// Get single category ||get method
router.get("/single-category/:slug", singleCategoryController);

//Delete Category ||delete method
router.delete(
  "/detete-category/:categoryId",
  requireSignIn,
  isAdmin,
  deleteCategoryController
); 

module.exports=router