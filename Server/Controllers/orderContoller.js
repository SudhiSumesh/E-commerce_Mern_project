const userModel = require("../Models/userModel");


exports.getUserOrderController=async (req,res)=>{
try {
  // Find the user by ID
  const user = await userModel.findById(req.user._id);

  // Check if user exists
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Retrieve orders for the user
  const orders = user.orders;

  // Send the orders in the response
  res.status(200).json({
    success: true,
    orders,
  });
} catch (error) {
  // Handle any errors that occur during the process
  console.error(error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
}


//get all users orders
exports.getAllUsersOrderController = async (req, res) => {
  try {
    // Fetch all users
    const users = await userModel.find();

    // Iterate through each user to collect orders
    const allOrders = [];
    for (const user of users) {
      allOrders.push(...user.orders);
    }

    // Send the orders in the response
    res.status(200).json({
      success: true,
      orders: allOrders,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};

//get single order

exports.getSingleOrderController = async (req, res) => {
  try {
    // Extract the user ID and order ID from the request parameters
    const { orderId } = req.params;

    // Query the database to find the user by ID
    const user = await userModel.findById(req.user._id);

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the order within the user's orders array based on the order ID
    const order = user.orders.find((order) => order._id.toString() === orderId);

    // Check if the order exists
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // If the order exists, return it in the response
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};