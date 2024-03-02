const express = require("express");
const {  paymentOrderController, paymentVerifyController } = require("../Controllers/paymentController");
const { requireSignIn } = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/orders", requireSignIn, paymentOrderController);
router.post("/verify", requireSignIn, paymentVerifyController);

module.exports = router;
