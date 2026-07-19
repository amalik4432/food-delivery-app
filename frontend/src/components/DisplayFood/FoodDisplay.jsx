import React, { useContext } from "react";
import { storeContext } from "../../context/StoreContext";
import Foodlist from "../FoodList/FoodList";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(storeContext);
  return (
    <div>
      <h1>Top Dishes for you</h1>
      <div className="food-display-list">
        {food_list
          .filter((item) => {
            return category === "All" || category === item.category;
          })
          .map((item, index) => {
            return (
              <Foodlist
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FoodDisplay;
