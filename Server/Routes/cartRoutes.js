const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../Middleware/authMiddleware");
const { AddToCartController, getItemsFromCartContoller, deleteItemsFromCartContoller } = require("../Controllers/cartContoller");

// Add To Cart||post method
router.put("/add-to-cart/",requireSignIn, AddToCartController);
router.get("/cart-item/", requireSignIn, getItemsFromCartContoller);
router.delete("/delete-item/:itemId", requireSignIn, deleteItemsFromCartContoller);

module.exports = router;