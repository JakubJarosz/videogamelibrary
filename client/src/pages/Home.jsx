import React from "react";
import GamesLibrary from "../components/GamesLibrary";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
       <GamesLibrary
        title={"Best rating"}
        ordering={"updated"}
        showSearch={true}
      ></GamesLibrary>
      <GamesLibrary
        title={"Best rating"}
        ordering={"-metacritic"}
      ></GamesLibrary>
      <GamesLibrary
        title={"Newly released"}
        ordering={"-released"}
      ></GamesLibrary>
    </Box>
  );
};

export default Home;
