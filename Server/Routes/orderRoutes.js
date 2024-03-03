const express = require("express");
const { requireSignIn, isAdmin } = require("../Middleware/authMiddleware");
const { getUserOrderController, getAllUsersOrderController } = require("../Controllers/orderContoller");
const router = express.Router();

//get user order||get method
router.get("/get-user-orders", requireSignIn, getUserOrderController);
router.get("/get-all-user-orders", requireSignIn,isAdmin, getAllUsersOrderController);

module.exports = router;
