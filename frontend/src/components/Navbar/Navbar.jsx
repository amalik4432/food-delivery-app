import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/StoreContext.jsx";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems, isLoggedIn, setIsLoggedIn, setToken } =
    useContext(storeContext);

  let hasItems = Object.values(cartItems).some((qty) => qty > 0);

  const handleLogout = async () => {
    try {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setToken("");
      setIsLoggedIn(false);

      toast.success("Logout Successful");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  const scrollToFooter = () => {
    setMenu("contact-us");

    setTimeout(() => {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <div className="navbar">
      {/* LOGO */}
      <Link to="/" onClick={() => setMenu("home")}>
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* MENU */}
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/about"
          onClick={() => setMenu("about")}
          className={menu === "about" ? "active" : ""}
        >
          About
        </Link>

        <Link
          to="/android-app"
          onClick={() => setMenu("android-app")}
          className={menu === "android-app" ? "active" : ""}
        >
          Android App
        </Link>

        <Link
          to="/"
          onClick={scrollToFooter}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </Link>
      </ul>

      {/* RIGHT SIDE */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search_icon" />

        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>

          {hasItems && <div className="dot"></div>}
        </div>
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>Sign Up</button>
        ) : (
          <div className="profile-logo">
            {/* PROFILE ICON */}
            <img src={assets.profile_icon} alt="profile-icon" />

            {/* DROPDOWN */}
            <ul className="profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="orders" />
                <p>Orders</p>
              </li>

              <hr />

              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
