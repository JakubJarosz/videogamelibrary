import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./state/authSlice";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import {
  Box
} from "@mui/material";
import "./styles/index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import GlobalError from "./components/GlobalError";
import GlobalLoading from "./components/GlobalLoading";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import GamesInfo from "./pages/GamesInfo";
import Library from "./pages/Library";
import WishlistPage from "./pages/WishlistPage";
import Reviews from "./pages/Reviews"

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      dispatch(fetchUser())
        .unwrap()
        .catch((error) => {
          if (error === "Unauthorized") {
            navigate("login");
          }
        });
    }
  }, [dispatch, navigate, location.pathname, user]);

  if (isLoading) {
    return <GlobalLoading />;
  }
  return (
    <Box sx={{
      backgroundColor: (theme) => theme.palette.background.default,
      padding: 2,
    }}>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <GlobalError />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/library"
            element={
              <PrivateRoute>
                <Library />
              </PrivateRoute>
            }
          />
            <Route
            path="/games/:id"
            element={
              <PrivateRoute>
                <GamesInfo />
              </PrivateRoute>
            }
          />
             <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <WishlistPage />
              </PrivateRoute>
            }
          />
             <Route
            path="/reviews/:id"
            element={
              <PrivateRoute>
                <Reviews />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
