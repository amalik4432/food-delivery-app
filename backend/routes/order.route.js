import express from "express";
const orderRouter = express.Router();
import { placeOrder, verifyOrder } from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/verify", authMiddleware, verifyOrder);

export default orderRouter;
