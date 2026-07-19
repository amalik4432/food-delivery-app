import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const frontend_Url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // delivery charge
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 500, // $5 fixed
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_Url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_Url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error placing order",
    });
  }
};

// VERIFY ORDER
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    // PAYMENT SUCCESS
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });

      res.json({
        success: true,
        message: "Payment Successful",
      });
    } else {
      // DELETE FAILED ORDER
      await orderModel.findByIdAndDelete(orderId);

      res.json({
        success: false,
        message: "Payment Failed",
      });
    }
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { placeOrder, verifyOrder };
