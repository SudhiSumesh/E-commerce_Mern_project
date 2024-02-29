const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../Middleware/authMiddleware");
const { AddToCartController, getItemsFromCartContoller } = require("../Controllers/cartContoller");

// Add To Cart||post method
router.put("/add-to-cart/",requireSignIn, AddToCartController);
router.put("/get-cart-item/", requireSignIn, getItemsFromCartContoller);

module.exports = router;