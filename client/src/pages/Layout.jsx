import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const drawerWidth = 250;
const collapsedWidth = 90;

const Layout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar open={open} toggleDrawer={toggleDrawer} />
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
    </Box>
  );
};

export default Layout;
