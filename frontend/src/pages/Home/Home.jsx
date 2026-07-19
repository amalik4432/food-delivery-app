import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreList from "../../components/ExploreList/ExploreList";
import FoodDisplay from "../../components/DisplayFood/FoodDisplay";

const Home = () => {
  let [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreList category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
