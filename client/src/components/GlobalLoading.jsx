import React from "react";
import { useSelector } from "react-redux";

const GlobalLoading = () => {
  const loading = useSelector((state) => state.auth.loading);
  if (!loading) return null;
  return (
    <div>
      <div>Loading...</div>
    </div>
  );
};

export default GlobalLoading;
