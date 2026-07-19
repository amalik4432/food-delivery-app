import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

const List = () => {
  const [list, setList] = useState([]);
  let url = "http://localhost:3000";

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list`);

        if (response.data.success) {
          setList(response.data.data);
        } else {
          toast.error("Error fetching data");
        }
      } catch (error) {
        console.log(error);
        toast.error("Server Error");
      }
    };

    loadData();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const res = await axios.delete(`${url}/api/food/remove`, {
        data: { id: foodId },
      });
      if (res.data.success) {
        toast.success("Food Removes");
        setList((prev) => prev.filter((item) => item._id !== foodId));
      } else {
        toast.error("Delete failed");
      }
    } catch (e) {
      toast.error("Server Error");
      console.log(e);
    }
  };

  return (
    <div className="list">
      <h2>Food List</h2>

      {list.map((item) => (
        <div key={item._id} className="list-item">
          {/* DELETE BUTTON */}
          <span onClick={() => removeFood(item._id)} className="delete-btn">
            ×
          </span>

          <img src={`${url}/images/${item.image}`} alt={item.name} />

          <div className="list-item-content">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p className="price">${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
