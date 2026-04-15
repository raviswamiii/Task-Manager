import React, { useState, useContext, useEffect } from "react";
import { AddTask } from "../components/AddTask";
import { TaskManagerContext } from "../context/TaskManagerContext";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
  const { setAddTaskPanel, tasks, setTasks, capitalizeFirstLetter } =
    useContext(TaskManagerContext);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/getTasks`);
      if (response.data.success) {
        setTasks(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
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

      {/* ✅ Scroll only here */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-2 hide-scrollbar">
        {tasks.length > 0 ? (
          tasks.map((item, index) => (
            <Link
              to={`/task/${item._id}`}
              key={index}
              className="bg-[#8ABC94] text-white font-semibold rounded-2xl px-4 py-2"
            >
              <p className="text-lg truncate">
                {capitalizeFirstLetter(item.title)}
              </p>
              <p className="text-sm truncate">
                {capitalizeFirstLetter(item.description)}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400">Tasks not added yet.</p>
        )}
      </div>

      <AddTask />
    </div>
  );
};
