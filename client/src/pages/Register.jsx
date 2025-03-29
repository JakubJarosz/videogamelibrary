import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  })
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    // validation checks
    if (formData.name === "") {
      setErrors((prev) => ({
        ...prev,
        name: "Enter nickname"
      }))
    }
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setFormData({});
        toast.success("Login Successful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log(formData)
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid item>
        <Box
          component="form"
          onSubmit={registerUser}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 350,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Register
          </Typography>
          <TextField
            label="Nickname"
            variant="filled"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="standard-password-input"
            label="Email"
            variant="filled"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button type="submit" variant="contained" disabled={false}>
            Register
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
