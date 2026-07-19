import express from "express";
const userRouter = express.Router();
import { login, register, logoutUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logoutUser);
userRouter.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    userId: req.user.id,
  });
});

export default userRouter;
