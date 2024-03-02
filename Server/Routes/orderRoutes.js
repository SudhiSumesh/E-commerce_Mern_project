const express = require("express");
const { requireSignIn } = require("../Middleware/authMiddleware");
const { getUserOrderController } = require("../Controllers/orderContoller");
const router = express.Router();

//get user order||get method
router.get("/get-user-orders", requireSignIn, getUserOrderController);
// router.get("/get-all-user-orders", requireSignIn, );

module.exports = router;
