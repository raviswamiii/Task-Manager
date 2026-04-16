import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TaskManagerContext } from "../context/TaskManagerContext";
import { IoReturnUpBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { EditTask } from "./EditTask";

export const Task = () => {
  // 📌 Get taskId from URL params
  const { taskId } = useParams();

  // 📌 Local state for current task
  const [newTask, setNewTask] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // 📌 Context values
  const {
    capitalizeFirstLetter,
    setEditTaskPanel,
    selectedTask,
    setSelectedTask,
  } = useContext(TaskManagerContext);

  const navigate = useNavigate();

  // 🔄 Fetch single task from backend
  const fetchTask = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/getTask/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNewTask(response.data.data);
        setSelectedTask(response.data.data); // store in context for edit
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // 🔁 Sync local state when selectedTask changes
  useEffect(() => {
    if (selectedTask) {
      setNewTask(selectedTask);
    }
  }, [selectedTask]);

  // 🚀 Fetch task when component mounts or taskId changes
  useEffect(() => {
    fetchTask();
  }, [taskId]);

  // ⏳ Loading state
  if (!newTask) return <p>Loading...</p>;

  return (
  <div className="h-screen flex flex-col px-4 py-3">

    {/* 🔝 HEADER (fixed / sticky) */}
    <div className="sticky top-0 z-10 bg-white flex justify-between items-center mb-2 py-2">

      <div className="flex items-center gap-5 min-w-0">
        {/* 🔙 Back button */}
        <IoReturnUpBack
          onClick={() => navigate(-1)}
          className="text-3xl text-[#43754C] cursor-pointer shrink-0"
        />

        {/* 📝 Task title */}
        <h1 className="text-2xl text-[#43754C] font-bold truncate max-w-[70vw]">
          {capitalizeFirstLetter(newTask.title)}
        </h1>
      </div>

      {/* ✏️ Edit button */}
      <TbEdit
        className="text-2xl text-[#43754C] cursor-pointer shrink-0"
        onClick={() => setEditTaskPanel(true)}
      />
    </div>

    {/* 📄 SCROLLABLE CONTENT */}
    <div className="flex-1 overflow-y-auto hide-scrollbar rounded-2xl">

      {/* 📦 Task card */}
      <div className="bg-[#8ABC94] text-white font-semibold rounded-2xl px-4 py-4 shadow-md">

        <p className="leading-relaxed wrap-break-word">
          {capitalizeFirstLetter(newTask.description)}
        </p>

        {/* 📅 Due date */}
        <p className="text-sm text-gray-200 mt-3">
          Due Date: {new Date(newTask.dueDate).toLocaleDateString()}
        </p>
      </div>

    </div>

    {/* 🛠️ Edit Task Panel */}
    <EditTask />
  </div>
);
};