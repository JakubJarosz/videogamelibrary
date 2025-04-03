import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  Modal as MUIModal,
  Backdrop,
  Fade,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";

const CustomModal = ({ openModal, handleCloseModal }) => {
  const userId = useSelector((state) => state.auth.user?._id);
  const [steamId, setSteamId] = useState("");
  const [steamData, setSteamData] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const {value} = e.target;
    setSteamId(value)
    if (value) setError(false)
  }

  const handlefetchSteam = async () => {
    try {
      const response = await axios.get("/steamProfile", {
        params: { steamId },
      });
      if (response.data) {
        setSteamData(response.data);
      } else {
        setError(true);
      }
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
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
          }}
        >
          <Typography variant="h6" sx={{ mb: "10px" }}>
            Connect to your steam account
          </Typography>
          <Box sx={{ display: "flex" }}>
            <TextField
              label="SteamID"
              variant="outlined"
              onChange={handleChange}
              error={error}
              helperText={error && "No user found"}
            />
            <Button onClick={handlefetchSteam} sx={{ ml: "10px" }}>
              Search
            </Button>
          </Box>
          <Box sx={{ mt: "15px", display:"flex", justifyContent:"space-evenly" }}>
            {Object.keys(steamData).length === 0 ? (
              <></>
            ) : (
              <>
                <Typography variant="h6">{steamData.personaname}</Typography>
                <Avatar alt={steamData.personaname} src={steamData.avatar} />
              </>
            )}
          </Box>
        </Box>
      </Fade>
    </MUIModal>
  );
};

export default CustomModal;
