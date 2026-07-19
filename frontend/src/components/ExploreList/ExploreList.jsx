import React from "react";
import { menu_list } from "../../assets/assets.js";
import "./ExploreList.css";

const ExploreList = ({ category, setCategory }) => {
  const handleCategoryClick = (menuName) => {
    setCategory((prevCategory) => {
      return prevCategory === menuName ? "All" : menuName;
    });
  };

  return (
    <div className="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring your favorite meals, snacks, and
        beverages from top-rated restaurants near you. Enjoy fast, reliable
        delivery right to your doorstep with a seamless ordering experience
        anytime, anywhere.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => handleCategoryClick(item.menu_name)}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : null}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreList;
