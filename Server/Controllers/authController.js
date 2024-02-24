const userModel = require("../Models/userModel");
const JWT = require("jsonwebtoken");
const bcrypt=require('bcrypt')
const { hashPassword, comparePassword } = require("../Utils/authHelper");
const sendEmail = require("../Utils/sendMail");

//Register user || POST
exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, avatar, address } = req.body;
    //validation
    if (!name) return res.send({ error: "name is requierd" });
    if (!email) return res.send({ error: "email is requierd" });
    if (!password) return res.send({ error: "password is requierd" });
    if (!phone) return res.send({ error: "phone is requierd" });
    if (!address) return res.send({ error: "Address is requierd" });
    // check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ success: true, message: "Already Registered ,Pleace Login" });
    }
    //register new user
    const hashedPassword = await hashPassword(password); //hash password
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      avatar,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "user Registration successfull",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Registraion",
      error,
    });
  }
};
//Login user || POST
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Checking if user has given password and  email both
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "Invalid email or password ",
      });
    }
    // check if user exist
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Invalid email or password ",
      });
    }
    //check if passowrod is matching
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(200).json({
        success: false,
        message: "Invalid email or password ",
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "login success",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
//test route
exports.testController = async (req, res) => {
  res.status(200).json({
    message: "protected route accessed",
  });
};

//forgot password

exports.forgotController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "user not exist" });
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    const addOtp = await userModel.findByIdAndUpdate(user._id, {
      otp: otp,
    });
    if (addOtp) {
      sendEmail(email, otp);
      res.status(201).json({ message: "otp sended to mail" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Forgott password",
      error,
    });
  }
};

//reset password
exports.resetController=async (req,res)=>{
try {

  const {email,password,otp}=req.body
  if(!otp&&!password){
   return res.send("otp & passowrd requird")
  }
  if(password.length<3){
   return res.send("password must greater than 3");

  }
  const user=await userModel.findOne({email})

    if (!user) {
      return res.send("User not found");
    }
  if (otp==user?.otp) {
     const hashedPassword = await bcrypt.hash(password, 10);
     const updatedPassword = await userModel.findByIdAndUpdate(user._id, {
       password: hashedPassword,
       otp:""
     });
     if (updatedPassword) {
       return res.status(201).json({ message: "Password updated" });
     }
  }
} catch (error) {
   console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in reset password",
      error,
})
}
}