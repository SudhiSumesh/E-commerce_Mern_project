const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
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
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price must not be negative"],
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity must not be negative"],
    },
    imageOne: {
      type: String,
      required: true,
    },
    imageTwo: {
      type: String,
      required: true,
    },
    imageThree: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
