import React from "react";
import axios from "axios";

const Home = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get("/games", {
        params: {},
      });
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Home
      <button onClick={handleClick}>ssss</button>
    </div>
  );
};

export default Home;
