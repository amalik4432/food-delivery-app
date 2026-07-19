import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets.js";
import "./Add.css";
import { toast } from "react-toastify";

const Add = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/food/add",
        formData,
      );

      toast.success(res.data.message);

      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImage(null);
    } catch (error) {
      toast.success(error.message);
    }
  };

  return (
    <div className="add">
      <h2>Add Food Item</h2>

      <form className="flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Description"
          required
        ></textarea>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={data.category}
          onChange={handleChange}
          required
        />

        <div className="upload-box">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="upload"
            className="upload-icon"
            onClick={() => document.getElementById("fileInput").click()}
            required
          />

          <input
            type="file"
            id="fileInput"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default Add;
