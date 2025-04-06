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

const CustomModal = ({ openModal, handleCloseModal }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const steamProfile = useSelector((state) => state.steam.user);
  const loading = useSelector((state) => state.steam.loading);

  const [steamId, setSteamId] = useState("");
  const [steamData, setSteamData] = useState({});
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setSteamId(value);
    if (value) setError(false);
  };

  const handlefetchSteam = async () => {
    try {
      const response = await axios.get("/steamProfile", {
        params: { steamId },
      });
      if (response.data) {
        setSteamData(response.data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleRegister = async () => {
    setSubmitting(true);
    setSuccess(false);
    try {
      await axios.post("/connect-steam", { userId, steamId });
      await dispatch(fetchSteamData());
      setSuccess(true);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setSubmitting(false);
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
          <Typography
            variant="h6"
            sx={{ mb: "10px", color: (theme) => theme.palette.text.primary }}
          >
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
          {Object.keys(steamData).length > 0 && (
            <Box
              sx={{
                mt: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="subtitle1">
                  {steamData.personaname}
                </Typography>
                <Typography variant="body2">
                  {steamData.loccountrycode}
                </Typography>
              </Box>
              <Avatar alt={steamData.personaname} src={steamData.avatar} />
              <Button
                onClick={handleRegister}
                disabled={submitting || loading}
                variant="contained"
              >
                {submitting || loading ? (
                  <CircularProgress size={22} sx={{ color: "white" }} />
                ) : (
                  "Add"
                )}
              </Button>
            </Box>
          )}

          {success && (
            <Typography
              sx={{ mt: 2, color: "green", textAlign: "center" }}
              variant="body1"
            >
              ✅ Steam Connected!
            </Typography>
          )}
        </Box>
      </Fade>
    </MUIModal>
  );
};

export default CustomModal;
