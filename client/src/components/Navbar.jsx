import React, { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { logoutUser } from "../state/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Button color="secondary" variant="contained" onClick={toggleDarkMode}>
        toggleDarkTheme {darkMode}
      </Button>
      <Box>

      </Box>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton>
              <MenuIcon/>
            </IconButton>
            <Typography>
              Menu
            </Typography>
            <Button>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
