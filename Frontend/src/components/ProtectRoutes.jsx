import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signIn" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/signIn" replace />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/signIn" replace />;
  }
};