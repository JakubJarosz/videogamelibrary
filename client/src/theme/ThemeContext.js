import React, { createContext } from "react";
import { updateTheme } from "../state/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./defaultPallet";

export const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  const dispatch = useDispatch();
  
  const darkMode = useSelector((state) => state.auth.user?.theme);

  const toggleDarkMode = () => {
    const newTheme = darkMode === "dark" ? "light" : "dark";
    dispatch(updateTheme(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={getTheme(darkMode)}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
