import {createTheme} from "@mui/material/styles";

const lightPalette = {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#orange", // Orange
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  };
  
  const darkPalette = {
    primary: {
      main: "#90caf9", // Light Blue
    },
    secondary: {
      main: "#ffb74d", // Light Orange
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
  };
  

  export const getTheme = (darkMode) =>
    createTheme({
      palette: darkMode === "dark" ? darkPalette : lightPalette,
    });