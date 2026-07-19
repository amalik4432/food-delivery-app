import express from "express";
const cartRoute = express.Router();
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

cartRoute.post("/add", authMiddleware, addToCart);
cartRoute.post("/remove", authMiddleware, removeFromCart);
cartRoute.get("/get", authMiddleware, getCart);

export default cartRoute;
