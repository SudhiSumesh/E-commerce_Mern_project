const mongoose =require("mongoose")

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // use slugify for convert white space in to dash(-)
  slug: {
    type: String,
    lowercase: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
module.exports=mongoose.model('Category',CategorySchema)