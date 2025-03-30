import React, { useContext, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { logoutUser } from "../state/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
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

const drawerWidth = 250;
const collapsedWidth = 90;

const Navbar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

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
          <IconButton onClick={toggleDrawer}>
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
          <IconButton edge="end" size="large" onClick={toggleDrawer}>
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
    </Box>
  );
};

export default Navbar;
