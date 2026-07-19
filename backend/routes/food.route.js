import express from "express";
import multer from "multer";
import {
  addFood,
  getAllItems,
  removeFood,
} from "../controllers/food.controller.js";

const foodRouter = express.Router();

//* Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", getAllItems);
foodRouter.delete("/remove", removeFood);

export default foodRouter;
