import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const User = () => {
  const userId = useSelector((state) => state.auth.user?._id);
  const steamId = "76561198121520859";

  const handleClick = async () => {
    try {
      const response = await axios.get("/steamProfile", {
        params: { steamId },
      });
      console.log(response.data);
    } catch (error) {}
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("/connect-steam", {userId, steamId});
      return response.data;
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  return (
    <div>
      User Page
      <button onClick={handleClick}>fetchSteamProfile</button>
      <button onClick={handleRegister}>HANDLEREGISTER</button>
    </div>
  );
};

export default User;
