import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskManagerContext } from "../context/TaskManagerContext";

export const Logout = ({ setShowLogoutPopUp }) => {
  // 🚀 Navigation hook
  const navigate = useNavigate();

  // 🌐 Backend URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // 📦 Context
  const { setLogout } = useContext(TaskManagerContext);

  // 🔓 Handle logout
  const onLogoutHandle = async () => {
    try {
      // 📡 API call to logout (blacklist token)
      const response = await axios.post(
        `${backendURL}/user/logout`,
        null,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // ✅ Success
      if (response.data.success) {
        // Remove token from storage
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/signIn");
        setLogout(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      // ❌ Error handling
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 text-white">

      {/* 🧾 Heading */}
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold">Log Out</p>
        <p className="text-gray-300 text-sm mt-2">
          Are you sure you want to log out of your account?
        </p>
      </div>

      {/* 🔘 Action buttons */}
      <div className="flex gap-3 justify-center">

        {/* Confirm logout */}
        <button
          onClick={onLogoutHandle}
          className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 text-white font-medium py-2 rounded-xl shadow-md"
        >
          Confirm
        </button>

        {/* Cancel logout */}
        <button
          onClick={() => setLogout(false)}
          className="flex-1 bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-200 border border-white/20 text-white font-medium py-2 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
);
};