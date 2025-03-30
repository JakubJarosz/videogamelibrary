import React, { useContext, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { logoutUser } from "../state/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import GamesIcon from "@mui/icons-material/Games";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(true);

  const drawerWidth = 250;
  const collapsedWidth = 90;

  const handleOpen = () => {
    setOpen((prev) => !prev);
    console.log(open);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          left: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
          height: 64,
        }}
      >
        <Toolbar>
          <IconButton onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
          },
        }}
      >
        <Box
          sx={{
            pb: "8px",
            pt: "7px",
            display: open ? "flex" : "none",
            justifyContent: "flex-end",
            pr: "20px",
          }}
        >
          <IconButton edge="end" size="large" onClick={handleOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {["Home", "Library", "Games"].map((field) => (
            <ListItem key={field}>
              <ListItemButton>
                <ListItemIcon>
                  {field === "Home" && <HomeIcon />}
                  {field === "Library" && <LocalLibraryIcon />}
                  {field === "Games" && <GamesIcon />}
                </ListItemIcon>
                <ListItemText primary={field} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          transition: "margin-left 0.3s ease", // Smooth transition for content shift
          marginLeft: open ? `${drawerWidth}px` : `${collapsedWidth}px`, // Content margin changes based on drawer state
          marginTop: "64px", // To offset AppBar height
        }}
      >
        <Typography variant="h4">Main Content</Typography>
        <Typography paragraph>
          This is the main content area that adjusts based on the drawer state.
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
