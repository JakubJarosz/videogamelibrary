import React from "react";
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
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import GamesIcon from "@mui/icons-material/Games";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const drawerWidth = 250;
const collapsedWidth = 90;

const Navbar = ({
  open,
  toggleDrawer,
  handleClickMenu,
  handleCloseMenu,
  handleLogout,
  openMenu,
  anchorEl,
  darkMode,
  toggleDarkMode,
  handleOpenModal,
  avatar,
  user,
}) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          left: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
          height: 64,
          width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Drawer toggle button */}
          <IconButton
            onClick={toggleDrawer}
            sx={{ display: !open ? "flex" : "none" }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            sx={{ textAlign: "left", flexGrow: 1, ml: "15px" }}
          >
            Logo
          </Typography>
          <Typography variant="h6" sx={{ position: "absolute", right: 170 }}>
            {user}
          </Typography>
          {/* DarkModeToggle positioned absolutely */}
          <IconButton
            sx={{ position: "absolute", right: 116 }}
            onClick={toggleDarkMode}
          >
            {darkMode === "dark" && <DarkModeIcon />}
            {darkMode === "light" && <DarkModeOutlinedIcon />}
          </IconButton>
          {/* Avatar positioned absolutely */}
          <IconButton
            sx={{ position: "absolute", right: 56 }}
            onClick={handleOpenModal}
          >
            <Avatar src={avatar}>{user}</Avatar>
          </IconButton>
          {/* Menu positioned absolutely */}
          <IconButton
            sx={{ position: "absolute", right: 16 }}
            onClick={handleClickMenu}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            sx={{ mt: "15px" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
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
            <ListItem
              key={field}
              onClick={() =>
                field === "Home"
                  ? navigate("/")
                  : field === "Library"
                  ? navigate("/library")
                  : navigate("/fffff")
              }
            >
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
