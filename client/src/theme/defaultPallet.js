import { createTheme } from "@mui/material/styles";

const lightPalette = {
  primary: {
    main: "#64B5F6",
  },
  secondary: {
    main: "#D84343", 
  },
  background: {
    default: "#F8F9FA", 
    paper: "#FFFFFF", 
  },
  text: {
    primary: "#212121", 
    secondary: "#616161", 
  },
  icon: {
    primary: "", 
    secondary: "#616161", 
  },
};

const darkPalette = {
  primary: {                 
    main: "#1565C0", 
  },
  secondary: {
    main: "#FF9800", 
  },
  background: {
    default: "#10171E", 
    paper: "#1C1C1C", 
  },
  text: {
    primary: "#E0E0E0", 
    secondary: "#A0A0A0", 
  },
  icon: {
    primary: "#FFFFFF", 
    secondary: "#B0B0B0", 
  },
};

export const getTheme = (darkMode) =>
  createTheme({
    palette: darkMode === "dark" ? darkPalette : lightPalette,
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: darkMode === "dark" ? darkPalette.icon.primary : lightPalette.icon.primary, // Apply global icon color
          },
        },
      },
    },
  });