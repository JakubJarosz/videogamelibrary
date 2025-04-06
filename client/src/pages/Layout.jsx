import React, { useState, useContext } from "react";
import ConnectSteamModal from "../components/ConnectSteamModal";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { logoutUser } from "../state/authSlice";

const drawerWidth = 250;
const collapsedWidth = 90;

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.auth.user?.steamProfile?.avatar || "")
  const user = useSelector((state) => state.auth.user?.name)
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        open={open}
        toggleDrawer={toggleDrawer}
        handleClickMenu={handleClickMenu}
        handleCloseMenu={handleCloseMenu}
        handleLogout={handleLogout}
        openMenu={openMenu}
        anchorEl={anchorEl}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleOpenModal={handleOpenModal}
        avatar={avatar}
        user={user}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin-left 0.3s ease",
          marginLeft: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
          marginTop: "64px",
        }}
      >
        <Outlet />
      </Box>
      <ConnectSteamModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default Layout;
