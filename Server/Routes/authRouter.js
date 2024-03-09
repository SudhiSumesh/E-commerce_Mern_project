const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  forgotController,
  resetController,
  updateProfileController,
} = require("../Controllers/authController");
const { requireSignIn, isAdmin } = require("../Middleware/authMiddleware");

// routing
//REGISTER || POST METHOD
router.route("/register").post(registerController);

//LOGIN || POST METHOD
router.route("/login").post(loginController);

// User protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

//forgot password route
router.post("/forgot-password", forgotController);
//reset password
router.put("/reset-password", resetController);
//Admin protected route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  try {
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "errorr in auth",
      error,
    });
  }
});
// update-profile|| put method
router.put("/profile/:id", requireSignIn, updateProfileController);

module.exports = router;
