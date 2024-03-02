const slugify = require("slugify");
const CategoryModel = require("../Models/CategoryModel");
const productModel = require("../Models/productModel");


// create category
exports.createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    // return if not name
    if (!name) return res.status(401).json({ message: "Name is required" });
    //if name is empty
    if (name.trim() === "") {
      return res.status(401).json({ message: "Name is required" });
    }
    //check if category already existed
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(201).json({
        message: "category already exists",
      });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).json({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in create category",
      error,
    });
  }
};

//update category
exports.updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    // return if not name
    if (!name || !id)
      return res.status(401).json({ message: "name and Id is required" });
    //if name is empty
      if (name.trim() === "") {
        return res.status(401).json({ message: "Name is required" });
      }
    //find by id and update
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Category updated succssfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Updating Category",
      error,
    });
  }
};
//get all category
exports.categoryController= async (req,res)=>{
    try {
        const category =await CategoryModel.find({})
        res.status(200).json({ success:true,message:"Successfully getted All categoty",category})
    } catch (error) {
        console.log(error);
      res.status(500).json({
        success:false,
        message:"Error in getting category",
        error
      })
    }
}
//get single category 

exports.singleCategoryController= async (req,res)=>{
    try {
        const {slug}=req.params
        const category =await CategoryModel.find({slug})
        // if(!category) {return res.status(200).json({message:"no such category found "})}
        res.status(200).json({ success:true,message:"Successfully get categoty",category})
    } catch (error) {
        console.log(error);
      res.status(500).json({
        success:false,
        message:"Error in getting category",
        error
      })
    }
}
//delete category
exports.deleteCategoryController= async (req,res)=>{
     try {
       const { categoryId } = req.params;
       if (!categoryId) {
         return res.status(401).json({ message: "categoryId required" });
       }
       const category = await CategoryModel.findById(categoryId);
       if (!category) {
         return res.status(401).json({ message: "category not found" });
       }
       // Retrieve product IDs associated with this category
       const productIds = category.products;
       // Delete all associated products
       await productModel.deleteMany({ category:categoryId  });
       // Delete the category itself
       await CategoryModel.deleteOne({ _id: categoryId }); // Use deleteOne here
       res.status(200).json({
         success: true,
         message: "category deleted successfully",
       });
     } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Error in deleting category",
              error,
            });
     }
}