const dotenv = require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const userModel = require("../Models/userModel");
const productModel=require("../Models/productModel");


//orders
exports.paymentOrderController = async (req, res) => {
  try {
    const { amount } = req.body;
    const instance = new Razorpay({
      key_id: process.env.RAZOR_API_KEY_ID,
      key_secret: process.env.RAZOR_API_KEY_SECRET,
    });
    
    const options = {
      amount: amount * 100, //amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, message: "order created", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error order" ,error});
  }
};

//verify payment
exports.paymentVerifyController = async (req, res) => {
  try {
    // Extract required data from the request body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const { userOrder } = req.body;

    // Concatenate order ID and payment ID
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    // Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_API_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    // Verify if the signatures match
    const isSignatureValid = expectedSignature === razorpay_signature;

    // If signature is valid, update user's orders and payment details
    if (isSignatureValid) {
      // Find the user by ID
      const user = await userModel.findById(req.user._id);
      // Create a new order object with payment details
      const newOrder = {
        orderList: userOrder,
        payment: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
      };

      // Push the new order to the user's orders array
      user.orders.push(newOrder);

      // Save the updated user document
      await user.save();
      //stock management
        userOrder.map( async (order)=>{

          await productModel.findByIdAndUpdate(order.product._id, {
            quantity: order.product.quantity - order.quantity
          });
          console.log("success");
        })   

      res.status(200).json({
        success: true,
        message: "Payment verified and order placed successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "error in verification of payment",
      });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
