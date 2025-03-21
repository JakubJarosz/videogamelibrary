import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if(data.error) {
        toast.error(data.error)
      } else {
        setFormData({});
        navigate("/")
      }
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="text"
          placeholder="enter email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <label>Password</label>
        <input
          type="text"
          placeholder="enter password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
};

export default Login;
