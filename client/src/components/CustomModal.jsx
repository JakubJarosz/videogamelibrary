import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  Modal as MUIModal,
  Backdrop,
  Fade,
  Typography,
} from "@mui/material";

const CustomModal = ({ openModal, handleCloseModal }) => {
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
      const response = await axios.post("/connect-steam", { userId, steamId });
      return response.data;
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  return (
    <div>
      <MUIModal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <div>
              User Page
              <button onClick={handleClick}>fetchSteamProfile</button>
              <button onClick={handleRegister}>HANDLEREGISTER</button>
            </div>
          </Box>
        </Fade>
      </MUIModal>
    </div>
  );
};

export default CustomModal;
