import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../state/authSlice";
import {
  Box,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Button,
  Link,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
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
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginuser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await dispatch(loginUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", backgroundColor: "#8bc6f7" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Box
          component="form"
          onSubmit={loginuser}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 450,
            backgroundColor: "#ffff",
            p: "0 35px",
            borderRadius: "10px",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ mt: "40px", mb: "30px" }}
          >
            Login
          </Typography>
          {["email", "password"].map((field) => (
            <Box sx={{ mb: "30px" }}>
              <TextField
                sx={{ width: "100%" }}
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
                        {field === "email" && <EmailIcon />}
                        {field === "password" && <HttpsIcon />}
                      </InputAdornment>
                    ),
                    endAdornment: field === "password" && (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setVisible((prev) => !prev)}
                        >
                          {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              ></TextField>
            </Box>
          ))}
          <Button type="submit" variant="contained">
            Register
          </Button>
          <Box
            display="flex"
            justifyContent="center"
            sx={{ mt: "25px", mb: "30px" }}
          >
            <Typography variant="h7">
              Dont't have and account?{" "}
              <Link component="button" onClick={() => navigate("/register")}>
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
