import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Box } from "@mui/material";


const GlobalLoading = () => {
  const loadingProfile = useSelector((state) => state.auth.loading);
  const loadingSteam = useSelector((state) => state.steam.loading);
  if (!loadingProfile || !loadingSteam) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default GlobalLoading;
