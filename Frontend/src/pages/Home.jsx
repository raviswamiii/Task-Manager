import React, { useState, useContext, useEffect } from "react";
import { AddTask } from "../components/AddTask";
import { TaskManagerContext } from "../context/TaskManagerContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteSweep, MdLogout } from "react-icons/md";
import { GrEmptyCircle } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { Logout } from "../components/Logout";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  // 📌 Context values
  const {
    setAddTaskPanel,
    tasks,
    setTasks,
    capitalizeFirstLetter,
    logout,
    setLogout,
  } = useContext(TaskManagerContext);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // 🔐 Get token from localStorage
  const token = localStorage.getItem("token");

  // 🔄 Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendURL}/api/getTasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setTasks(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete task
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `${backendURL}/api/deleteTask/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success("Task deleted successfully");

        // 🔄 Remove deleted task from UI
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  // 🔁 Toggle task completion
  const handleToggleTask = async (id) => {
    try {
      const response = await axios.patch(
        `${backendURL}/api/toggleTask/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        const updatedTask = response.data.data;

        // 🔄 Update UI instantly
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? updatedTask : task)),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // 🚀 Fetch tasks on mount
  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  return (
    <div className="h-screen px-4 py-3 flex flex-col">
      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl text-[#43754C] font-bold">Task Manager</h1>

        {/* ➕ Add + 🚪 Logout */}
        <div className="flex items-center gap-3">
          <p
            onClick={() => setAddTaskPanel(true)}
            className="px-3 py-1 text-sm bg-[#8ABC94] rounded-md text-white font-semibold cursor-pointer"
          >
            Add Task
          </p>

          <MdLogout
            onClick={() => setLogout(true)}
            className="text-2xl text-red-400 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-2 hide-scrollbar border border-[#43754C] rounded-2xl p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            {/* Spinner */}
            <div className="w-8 h-8 border-4 border-[#8ABC94] border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-3 text-sm text-gray-400">Loading tasks...</p>
          </div>
        ) : tasks.length > 0 ? (
          tasks.map((item) => {
            const now = new Date();

            // ⚠️ Status checks
            const isOverdue = new Date(item.dueDate) < now && !item.isCompleted;

            const isPending =
              new Date(item.dueDate) >= now && !item.isCompleted;
            {
              /* 📜 Task List (scrollable) */
            }
            return (
              <div
                key={item._id}
                className={`flex items-center justify-between gap-3 text-white font-semibold rounded-2xl px-4 py-3 ${
                  isOverdue ? "bg-red-400" : "bg-[#8ABC94]"
                }`}
              >
                {/* ✅ Toggle complete (fixed size container) */}
                <div className="shrink-0">
                  {item.isCompleted ? (
                    <IoMdCheckmarkCircleOutline
                      onClick={() => handleToggleTask(item._id)}
                      className="text-3xl cursor-pointer"
                    />
                  ) : (
                    <GrEmptyCircle
                      onClick={() => handleToggleTask(item._id)}
                      className="text-3xl cursor-pointer"
                    />
                  )}
                </div>

                {/* 🔗 Task link (flex grows but doesn't affect icons) */}
                <Link className="flex-1 min-w-0" to={`/task/${item._id}`}>
                  <p className="text-lg truncate">
                    {capitalizeFirstLetter(item.title)}
                  </p>

                  <p className="text-sm truncate text-gray-100">
                    {capitalizeFirstLetter(item.description)}
                  </p>

                  <div className="flex justify-between">
                    <p className="text-xs text-gray-200">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </p>

                    <p className="text-xs">
                      {item.isCompleted
                        ? "Completed ✅"
                        : isOverdue
                          ? "Overdue ❌"
                          : "Pending ⏳"}
                    </p>
                  </div>
                </Link>

                {/* 🗑️ Delete (fixed size container) */}
                <div className="shrink-0">
                  <MdDeleteSweep
                    onClick={() => handleDeleteTask(item._id)}
                    className="text-4xl cursor-pointer"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center pt-34 px-4">
            {/* Icon */}
            <div className="text-6xl mb-4 opacity-70">📝</div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-200">
              No tasks yet
            </h2>

            {/* Subtitle */}
            <p className="text-gray-400 text-sm mt-2 max-w-sm">
              You haven’t added any tasks yet. Start by creating your first task
              and stay organized 🚀
            </p>

            {/* Optional hint */}
            <div className="mt-6 px-4 py-2 rounded-full bg-white/10 text-gray-300 text-xs">
              Click “Add Task” to get started
            </div>
          </div>
        )}
      </div>

      {/* ➕ Add Task Panel */}
      <AddTask />

      {/* 🚪 Logout Popup Overlay */}
      <div
        className={`flex justify-center items-center px-6 fixed inset-0 z-20 bg-black/60 backdrop-blur-sm ${
          logout ? "" : "hidden"
        }`}
      >
        <Logout />
      </div>
    </div>
  );
};
