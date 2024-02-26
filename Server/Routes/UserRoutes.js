const express =require("express");
const { requireSignIn, isAdmin } = require("../Middleware/authMiddleware");
const { getAllUserctController } = require("../Controllers/UserController");
const router = express.Router();

//get userList ||get method
router.get("/get-all-user", requireSignIn, isAdmin, getAllUserctController);

module.exports = router;