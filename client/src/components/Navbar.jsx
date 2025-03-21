import React from 'react'
import { logoutUser } from '../state/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login")
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
