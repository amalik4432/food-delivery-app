import React, { useContext } from "react";
import { storeContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    food_list,
    url,
  } = useContext(storeContext);

  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();
  const deliveryFee = totalAmount > 0 ? 5 : 0;

  return (
    <div className="cart">
      {/* 🛒 ITEMS LIST */}
      <div className="cart-items">
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="cart-item" key={item._id}>
                <img
                  className="cart-item-img"
                  src={`${url}/images/${item.image}`}
                  alt="item"
                />

                <div className="cart-item-info">
                  <p className="item-name">{item.name}</p>

                  <p className="item-quantity">
                    Quantity: {cartItems[item._id]}
                  </p>

                  <div className="icons">
                    <img
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_green}
                      alt="add"
                    />
                    <img
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_red}
                      alt="remove"
                    />
                  </div>

                  <p className="item-price">${item.price} per item</p>

                  <p className="item-total">
                    Total: ${item.price * cartItems[item._id]}
                  </p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* 🧾 SUMMARY OR EMPTY CART */}
      {totalAmount > 0 ? (
        <div className="cart-bottom">
          <div className="cart-summary">
            <h2>Cart Summary</h2>

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
              <p>${totalAmount + deliveryFee}</p>
            </div>

            <button onClick={() => navigate("/order")} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <h2>Your Cart is Empty 🛒</h2>
          <p>Add some delicious food to continue</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
