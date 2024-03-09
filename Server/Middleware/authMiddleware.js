const JWT = require("jsonwebtoken");
const userModel = require("../Models/userModel");

//protected routes token base
exports.requireSignIn = async (req, res, next) => {
  const token = req.headers.authorization; //get token
  //
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token required",
    });
  }
  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "invalid token",
      error,
    });
  }
};
//admin access
exports.isAdmin = async (req, res, next) => {
  try {
    //find user by id
    const user = await userModel.findById(req.user._id);
    //check if user is Admin
    if (user?.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
