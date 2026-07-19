import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add Food Item
const addFood = async (req, res) => {
  try {
    let image_file = req.file.filename;
    let { name, description, price, category } = req.body;

    let food = new foodModel({
      name,
      description,
      price,
      image: image_file,
      category,
    });
    await food.save();
    res.json({ success: "true", message: "Food Added" });
  } catch (e) {
    res.json({ success: "false", message: "Food Adding Failed" });
  }
};

const getAllItems = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (e) {
    console.log(`error ${e}`);
    res.json({ success: false, message: "foods items Error" });
  }
};

const removeFood = async (req, res) => {
  try {
    let { id } = req.body;
    let food = await foodModel.findById(id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

export { addFood, getAllItems, removeFood };
