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
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      // ❌ Error handling
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-white border flex flex-col justify-center items-center gap-4 rounded px-4 py-2">
      {/* 🧾 Heading */}
      <div className="text-center">
        <p className="text-xl font-semibold">Log Out</p>
        <p className="text-gray-600">
          Are you sure you want to log out?
        </p>
      </div>

      {/* 🔘 Action buttons */}
      <div>
        {/* Confirm logout */}
        <button
          onClick={onLogoutHandle}
          className="border px-5 py-1 rounded mr-2"
        >
          Confirm
        </button>

        {/* Cancel logout */}
        <button
          onClick={() => setLogout(false)}
          className="border px-5 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};