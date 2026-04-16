import React, { useState, useContext, useEffect } from "react";
import { AddTask } from "../components/AddTask";
import { TaskManagerContext } from "../context/TaskManagerContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteSweep } from "react-icons/md";
import { GrEmptyCircle } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

export const Home = () => {
  const { setAddTaskPanel, tasks, setTasks, capitalizeFirstLetter } =
    useContext(TaskManagerContext);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
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
    }
  };

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
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

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

        setTasks((prev) =>
          prev.map((task) => (task._id === id ? updatedTask : task)),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);
  return (
    <div className="h-screen px-4 py-3 flex flex-col">
      {/* ✅ Header (fixed, no scroll) */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl text-[#43754C] font-bold">Task Manager</h1>
        <p
          onClick={() => setAddTaskPanel(true)}
          className="px-3 py-1 text-sm bg-[#8ABC94] rounded-md text-white font-semibold"
        >
          Add Task
        </p>
      </div>

      {/* ✅ Scroll */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-2 hide-scrollbar">
        {tasks.length > 0 ? (
          tasks.map((item) => {
            const now = new Date();

            const isOverdue = new Date(item.dueDate) < now && !item.isCompleted;

            const isPending =
              new Date(item.dueDate) >= now && !item.isCompleted;
            return (
              <div
                key={item._id}
                className={`flex items-center justify-between gap-3 text-white font-semibold rounded-2xl px-4 py-2 ${
                  isOverdue ? "bg-red-400" : "bg-[#8ABC94]"
                }`}
              >
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

                <Link className="w-full" to={`/task/${item._id}`}>
                  <p className="text-lg truncate max-w-[60vw]">
                    {capitalizeFirstLetter(item.title)}
                  </p>
                  <p className="text-sm truncate max-w-[60vw] text-gray-100">
                    {capitalizeFirstLetter(item.description)}
                  </p>
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
                </Link>

                <MdDeleteSweep
                  onClick={() => handleDeleteTask(item._id)}
                  className="text-4xl cursor-pointer"
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400">Tasks not added yet.</p>
        )}
      </div>

      <AddTask />
    </div>
  );
};
