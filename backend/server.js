import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

import "dotenv/config";
import cartRoute from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

connectDb();

//* API END POINTS
app.use("/images", express.static("uploads"));
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRoute);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
