import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectRoutes = ({ children }) => {
  // 🔐 Get token from localStorage
  const token = localStorage.getItem("token");

  // ❌ If no token → redirect to SignIn
  if (!token) {
    return <Navigate to="/signIn" replace />;
  }

  try {
    // 🔍 Decode JWT token
    const decoded = jwtDecode(token);

    // ⏱️ Get current time in seconds
    const currentTime = Date.now() / 1000;

    // ❌ If token expired → remove + redirect
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/signIn" replace />;
    }

    // ✅ Token valid → allow access
    return children;
  } catch (err) {
    // ❌ If token is invalid/corrupted → remove + redirect
    localStorage.removeItem("token");
    return <Navigate to="/signIn" replace />;
  }
};