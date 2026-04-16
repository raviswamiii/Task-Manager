import React from "react";
import { Home } from "./pages/Home";
import { Task } from "./components/Task";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ProtectRoutes } from "./components/ProtectRoutes";

export const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* 🔐 Protected */}
        <Route
          path="/"
          element={
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          }
        />

        <Route
          path="/task/:taskId"
          element={
            <ProtectRoutes>
              <Task />
            </ProtectRoutes>
          }
        />

        {/* 🔓 Public */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
};