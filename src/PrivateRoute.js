import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
