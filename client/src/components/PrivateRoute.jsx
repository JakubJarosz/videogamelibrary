import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);

  if (!user && isLoading) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
