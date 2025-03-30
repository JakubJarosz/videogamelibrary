import React from "react";
import axios from "axios";
import {
  Box,
} from "@mui/material";

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
    // <Box component="main"
    // x={{ flexGrow: 1, p: 3 }}
    // >
    //   Home
    //   <button onClick={handleClick}>fetchGames</button>
    //   <button>handleSSSsssssssssssssssssssSF</button>
    // </Box>
    <></>
  );
};

export default Home;
