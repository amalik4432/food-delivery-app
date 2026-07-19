import React, { useContext, useState } from "react";
import { storeContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, url } =
    useContext(storeContext);

  const navigate = useNavigate();

  // FORM DATA
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  // TOTALS
  const totalAmount = getTotalCartAmount();
  const deliveryFee = totalAmount > 0 ? 5 : 0;
  const finalAmount = totalAmount + deliveryFee;

  // INPUT CHANGE HANDLER
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // PLACE ORDER FUNCTION
  const placeOrder = async () => {
    let orderItems = [];

    // GET CART ITEMS
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
          image: item.image,
        });
      }
    });

    // ORDER DATA
    const orderData = {
      ...data,
      items: orderItems,
      amount: finalAmount,
    };

    try {
      // API CALL
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        withCredentials: true, // COOKIE SEND
      });

      // SUCCESS
      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // FORM SUBMIT
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // EMPTY CART CHECK
    if (totalAmount <= 0) {
      alert("Cart is empty 🛒");
      return;
    }

    await placeOrder();
  };

  return (
    <div className="order">
      {/* EMPTY CART */}
      {totalAmount <= 0 ? (
        <div className="empty-order">
          <h2>Your cart is empty 🛒</h2>

          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      ) : (
        <>
          {/* LEFT FORM */}
          <form className="order-left" onSubmit={onSubmitHandler}>
            <h2>Delivery Information</h2>

            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Full Name"
              required
            />

            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Email"
              required
            />

            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={onChangeHandler}
              placeholder="Phone"
              required
            />

            <input
              type="text"
              name="address"
              value={data.address}
              onChange={onChangeHandler}
              placeholder="Address"
              required
            />

            <input
              type="text"
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              placeholder="City"
              required
            />

            <button type="submit">Place Order</button>
          </form>

          {/* RIGHT SUMMARY */}
          <div className="order-right">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>

            <div className="summary-row">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>

            <hr />

            <div className="summary-row total">
              <p>Total</p>
              <p>${finalAmount}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
