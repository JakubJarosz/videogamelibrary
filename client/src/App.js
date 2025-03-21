import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./state/authSlice";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import GlobalError from "./components/GlobalError";
import GlobalLoading from "./components/GlobalLoading";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      dispatch(fetchUser())
        .unwrap()
        .catch((error) => {
          if (error === "Unauthorized") {
            navigate("login");
          }
        });
    }
  }, [dispatch, navigate, location.pathname]);
  return (
    <div className="App">
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <GlobalError />
      <GlobalLoading />
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
