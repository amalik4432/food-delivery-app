import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MobileApp from "./components/MobileApp/MobileApp.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import About from "./pages/About/About";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify/Verify.jsx";

const App = () => {
  let [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ToastContainer />
      <div className="app">
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </div>
      <MobileApp />
      <Footer />
    </>
  );
};

export default App;
