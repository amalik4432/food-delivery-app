import React, { useContext } from "react";
import "./FoodList.css";
import { storeContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets"; // APNE PATH KE HISAAB SE IMPORT THK KR LEIN

const Foodlist = ({ id, name, image, price, description, category }) => {
  let { cartItems, addToCart, removeFromCart, url } = useContext(storeContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* Backend ke URL ko image naam k sath jor diya */}
        <img src={`${url}/images/${image}`} alt="item-image" />
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h4>{name}</h4>
          {/* Icons assets se layein, food_list se nahi */}
          <img src={assets.rating_starts} alt="rating" />
        </div>

        {!cartItems[id] ? (
          <img
            className="add-icon-white"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white} // Fixed
            alt="add"
          />
        ) : (
          <div className="count-icons">
            <img
              className="add-icon-green"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green} // Fixed
              alt="add"
            />
            <p>{cartItems[id]}</p>
            <img
              className="remove-icon-red"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red} // Fixed
              alt="remove"
            />
          </div>
        )}

        {/* Props use karein, food_list array ko direct render mat karein */}
        <p className="description">{description}</p>
        <p className="price">${price}</p>
        <p className="category">{category}</p>
      </div>
    </div>
  );
};

export default Foodlist;
