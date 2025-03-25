import React, {createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {ThemeProvider} from "@mui/material/styles"
import { getTheme } from "./defaultPallet";

export const ThemeContext = createContext();

const ThemeProviderWrapper = ({children}) => {
    const storedTheme = useSelector((state) => state.auth.user?.theme);
    const [darkMode, setDarkMode] = useState(storedTheme);


    // useEffect(() => {
    //     if(storedTheme) {
    //         setDarkMode(storedTheme)
    //         console.log(storedTheme)
    //     }
    // }, [storedTheme])
console.log(storedTheme)

   const toggleDarkMode = async() => {
      const newTheme = darkMode === "dark" ? "light" : "dark"
      setDarkMode(newTheme)
   }
  
   return (
    <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
        <ThemeProvider theme={getTheme(darkMode)}>
            {children}
        </ThemeProvider>
    </ThemeContext.Provider>
   )
}

export default ThemeProviderWrapper

