import mongoose from "mongoose";
import foodModel from "../models/foodModel.js"; // Yahan foodModel ka sahi path dena zaroori hai
import { food_list } from "./data.js";

const seedDB = async () => {
  try {
    // 1. Aapke local DB se connect kar raha hai
    await mongoose.connect("mongodb://localhost:27017/foodapp");
    console.log("✅ Database se connect ho gaya!");

    // 2. Purana data clean karna (taake duplicate na ho)
    await foodModel.deleteMany({});
    console.log("🧹 Purana data remove kar diya.");

    // 3. Poora 32 items ka data insert karna
    await foodModel.insertMany(food_list);
    console.log("🚀 Saaray 32 food items database mein push ho gaye hain!");

    // 4. Script ka kaam khatam hone par connection close karna
    mongoose.connection.close();
    console.log("👋 Connection close ho gaya.");
  } catch (error) {
    console.log("❌ Error:", error);
    mongoose.connection.close();
  }
};

// Function ko run karein
seedDB();
