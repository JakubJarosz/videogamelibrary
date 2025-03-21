import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { loginUser } from "../state/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginuser = async (e) => {
    e.preventDefault();
   const result = await dispatch(loginUser(formData));
   if (result.meta.requestStatus === "fulfilled") {
    navigate("/")
   }
  };
 console.log(formData)
  return (
    <div>
      <form onSubmit={loginuser}>
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
