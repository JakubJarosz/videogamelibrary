import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Modal as MUIModal,
  Backdrop,
  Fade,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { fetchSteamData } from "../state/steamSlice";

const AchievementsModal = () => {
  return (
    <MUIModal>
      <Fade>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
          }}
        ></Box>
      </Fade>
    </MUIModal>
  );
};

export default AchievementsModal;
