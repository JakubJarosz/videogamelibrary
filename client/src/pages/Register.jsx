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
    password: "",
  });

  const checkIfError = (field) => {
    if (errors[field] === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: "", // Clear the error for the specific field
      }));
    }
    
  };
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    // validation checks
    if (formData.name === "") {
      setErrors((prev) => ({
        ...prev,
        name: "Enter nickname",
      }));
    }
    if (formData.email === "") {
      setErrors((prev) => ({
        ...prev,
        email: "Enter email",
      }));
    }
    if (formData.password === "") {
      setErrors((prev) => ({
        ...prev,
        password: "Enter password",
      }));
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
  console.log(formData);
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
            error={checkIfError("name")}
            name="name"
            helperText={errors.name}
            label="Nickname"
            variant="filled"
            value={formData.name}
            onChange={handleChange}
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
            error={checkIfError("email")}
            name="email"
            helperText={errors.email}
            id="standard-password-input"
            label="Email"
            variant="filled"
            value={formData.email}
            onChange={handleChange}
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
            error={checkIfError("password")}
            name="password"
            helperText={errors.password}
            label="Password"
            type="password"
            variant="filled"
            value={formData.password}
            onChange={handleChange}
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
