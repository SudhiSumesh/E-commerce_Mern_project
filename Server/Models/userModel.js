const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

const orderSchema = new mongoose.Schema({
  orderList: [
    {
      product: {},
      quantity: {
        type: Number,
        min: [0, "Quantity must not be negative"],
      },
    },
  ],
  payment: paymentSchema, // Include payment details here
});
// const deleteRequestSchema = new mongoose.Schema();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [3, "Name should have more than 3 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: [3, "Password should be greater than 3 characters"],
    },
    avatar: {
      type: String,
      default:
        "https://tse4.mm.bing.net/th?id=OIP.tgmmCh4SA36j0dMT0ay9_AHaHa&pid=Api&P=0&h=180",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    role: {
      type: Number,
      default: 0,
    },
    otp: {
      type: Number,
    },
    deleteRequest: {
      reason: {
        type: String,
        required: [true, "Reason for deletion is required"],
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
    cart: {
      items: [
        {
          product: {
            type: mongoose.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            min: [0, "Quantity must not be negative"],
          },
        },
      ],
    },
    orders: [orderSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
