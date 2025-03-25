import React, {useContext} from 'react'
import {ThemeContext} from "../theme/ThemeContext"
import { logoutUser } from '../state/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from "@mui/material/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {darkMode, toggleDarkMode} = useContext(ThemeContext)

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login")
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Button  color="secondary" variant="contained" onClick={toggleDarkMode}>toggleDarkTheme {darkMode}</Button>
    </div>
  )
}

export default Navbar
