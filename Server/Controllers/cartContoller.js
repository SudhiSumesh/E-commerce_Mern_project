const userModel = require("../Models/userModel");

// add item to users cart
exports.AddToCartController = async (req, res) => {
  try {
    // Extract productId and quantity from request body
    const { productId, quantity } = req.body;

    // Find the user by ID
    const user = await userModel.findById(req.user._id);

    // If user doesn't exist, return error
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the product is already in the cart
    const existingItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, update its quantity
      user.cart[existingItemIndex].items.quantity += quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      user.cart.push({ items: { product: productId, quantity } });
    }

    // Recalculate total price
    user.cart.totalPrice += quantity;

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get cart items

exports.getItemsFromCartContoller = async (req, res) => {
  try {
    // Find the user by ID
    const user = await userModel
      .findById(req.user._id)
      .populate("cart.items.product");

    // If user doesn't exist, return error
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // // Extract cart data
    // const cartData = user.cart.map((item) => ({
    //   product: item.items.product,
    //   quantity: item.items.quantity,
    // }));

    // // Calculate total price
    // const totalPrice = user.cart.reduce(
    //   (total, item) => total + item.totalPrice,
    //   0
    // );

    // Return the user's cart data
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
