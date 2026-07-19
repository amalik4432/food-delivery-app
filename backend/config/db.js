import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/foodapp")
    .then(() => {
      console.log("Connected To DB");
    })
    .catch((e) => {
      console.log(e);
    });
};
