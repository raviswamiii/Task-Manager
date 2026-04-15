import React from "react";
import { Home } from "./pages/Home";
import { Task } from "./components/Task";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:taskId" element={<Task />} />
      </Routes>
    </div>
  );
};
