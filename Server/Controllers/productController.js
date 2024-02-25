const slugify = require("slugify");
const productModel = require("../Models/productModel");

//create product
exports.createProductController = async (req, res) => {
  console.log(req.body);
  try {
    const { name, description, price, category, quantity } = req.body;
    const imageOne = req.files[0].filename;
    const imageTwo = req.files[1].filename;
    const imageThree = req.files[2].filename;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !imageOne:
        return res.status(500).send({ error: "image is Required" });
      case !imageTwo:
        return res.status(500).send({ error: "image is Required" });
      case !imageThree:
        return res.status(500).send({ error: "image is Required" });
    }

    //existing product
      const productexist = await productModel.findOne({ name });

      if (productexist)
        return res.status(401).json({ message: "product already exist" });
    // create
    const product = await productModel.create({
      name,
      description,
      price,
      category,
      quantity,
      imageOne,
      imageTwo,
      imageThree,
      slug: slugify(name),
    });
    res.status(200).json({
      success: true,
      message: "Product successfully created",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in create product",
      error,
    });
  }
};

//get all products

exports.getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(15)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "successfully getted All Products ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

//get single product

exports.getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getitng single product",
      error,
    });
  }
};

//update products

exports.updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, images } = req.body;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
    }
    //update
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product successfully updated",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

//delete products
exports.deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//search product 

exports.searchProductController=async(req,res)=>{
 try {
  const {keyword}=req.params
  const results=await productModel.find({
    $or:[
      {name:{$regex:keyword,$options:"i"}},//option i for case insensitive
      {description:{$regex:keyword,$options:"i"}}
    ]
  }).select()
  res.status(200).json({
    success:true,
    message:"filterd data",
    results
  })

 } catch (error) {
  res.status(500).json({
    message:"error in search product",
    success:false,
    error
  })
 }
}