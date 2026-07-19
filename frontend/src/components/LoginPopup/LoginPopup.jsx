import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopup.css";
import axios from "axios";
import { storeContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");

  const { url, setIsLoggedIn, setToken } = useContext(storeContext);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setData({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let newUrl = url;

      if (currState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      const payload =
        currState === "Login"
          ? {
              email: data.email,
              password: data.password,
            }
          : {
              username: data.username,
              email: data.email,
              password: data.password,
            };

      const res = await axios.post(newUrl, payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        setToken(res.data.token);
        toast.success(
          currState === "Login"
            ? "Login Successful"
            : "Registered Successfully",
        );

        setIsLoggedIn(true);
        resetForm();
        setShowLogin(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="formhead">
          <h1>{currState}</h1>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        {/* INPUTS */}
        <div className="login-popup-inputs">
          <input
            placeholder="Enter your email"
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
          />

          {currState === "Sign Up" && (
            <input
              placeholder="Enter your Username"
              type="text"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
            />
          )}

          <input
            placeholder="Enter Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : currState === "Sign Up"
              ? "Sign Up"
              : "Login"}
        </button>

        <p>
          {currState === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() =>
              setCurrState(currState === "Login" ? "Sign Up" : "Login")
            }
          >
            {currState === "Login" ? " Sign Up" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
