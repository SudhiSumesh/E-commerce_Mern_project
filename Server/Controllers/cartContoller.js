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
    const existingItemIndex = user.cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, update its quantity
      user.cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      user.cart.items.push({ product: productId, quantity });
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

    // Return the user's cart data
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//delete cart item
exports.deleteItemsFromCartContoller = async (req, res) => {
  const itemId = req.params.itemId; // Extract item ID from request parameters

  try {
    // Find the user by ID
    const user = await userModel.findById(req.user._id);

    // If user doesn't exist, return error
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the index of the item in the cart array
    const itemIndex = user.cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    // If item doesn't exist in cart, return error
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    // Remove the item from the cart array
    user.cart.items.splice(itemIndex, 1);

    // Save the updated user object
    await user.save();

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
