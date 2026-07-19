import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);

    const userId = req.user.id;

    const user = await userModel.findById(userId);

    let cartData = user.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData,
    });

    res.json({
      success: true,
      message: "Item added to cart",
      cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error adding to cart",
    });
  }
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    const userId = req.user.id;

    const user = await userModel.findById(userId);

    let cartData = user.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData,
    });

    res.json({
      success: true,
      message: "Item removed",
      cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error removing item",
    });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    res.json({
      success: true,
      cartData: user.cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error getting cart",
    });
  }
};

export { addToCart, removeFromCart, getCart };
