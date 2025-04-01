import React from "react";
import GamesLibrary from "../components/GamesLibrary";

const Home = () => {
 
  return (
    <>
   <GamesLibrary title={"Best rating"} ordering={"-metacritic"}></GamesLibrary>
   <GamesLibrary title={"Newly released"} ordering={"-released"}></GamesLibrary>
    </>
  );
};

export default Home;
