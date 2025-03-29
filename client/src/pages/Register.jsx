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

 const [visible, setVisible] = useState(false);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const value = formData[field].trim();
      if (!value) {
        newErrors[field] = `Enter ${field}`;
        return;
      }
      switch (field) {
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors[field] = "Enter a valid email address";
          }
          break;

        case "password":
          if (value.length < 6) {
            newErrors[field] = "Password must be at least 6 characters";
          }
          break;
        case "name":
          if (value.length < 3) {
            newErrors[field] = "Password must be at least 3 characters";
          }
          break;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const { name, email, password } = formData;
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
        toast.success("Registration Successful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
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
          {["name", "email", "password"].map((field) => (
            <TextField
              key={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === "password" && !visible ? "password" : "text"}
              variant="filled"
              value={formData[field]}
              onChange={handleChange}
              error={Boolean(errors[field])}
              helperText={errors[field]}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      {field === "name" && <AccountCircle />}
                      {field === "email" && <EmailIcon />}
                      {field === "password" && <HttpsIcon />}
                    </InputAdornment>
                  ),
                  endAdornment: field === "password" && (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={(() => setVisible((prev) => !prev))}>
                        {visible ? <VisibilityIcon /> : <VisibilityOffIcon/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            ></TextField>
          ))}
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
