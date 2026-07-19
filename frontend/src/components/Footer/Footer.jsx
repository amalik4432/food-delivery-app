import React from "react";
import { assets } from "../../assets/assets.js";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo-img" />
          <p>
            Craving something delicious? We’ve got you covered! Order from a
            wide range of restaurants and get your favorite food delivered hot,
            fresh, and fast right when you need it.
          </p>
          <img src={assets.facebook_icon} alt="facebook_icon" />
          <img src={assets.twitter_icon} alt="twitter_icon" />
          <img src={assets.linkedin_icon} alt="linkedin_icon" />
        </div>
        <div className="footer-center-left">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Android App</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-right-left">
          <ul>
            <li>Get In Touch</li>
            <li>+92 333xxxxxx</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="copy-right">
        © 2026 Tomato. All Rights Reserved. Crafted with care for a better food
        ordering experience.
      </p>
    </div>
  );
};

export default Footer;
