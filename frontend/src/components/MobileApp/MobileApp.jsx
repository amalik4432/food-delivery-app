import React from "react";
import { assets } from "../../assets/assets";
import "./MobileApp.css";

const MobileApp = () => {
  return (
    <div className="download-links">
      <h1>For Better Experience Download Tomato App</h1>
      <div className="download-stores">
        <img
          className="playstore-img"
          src={assets.play_store}
          alt="playstore_logo"
        />
        <img className="appstore-img" src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

export default MobileApp;
