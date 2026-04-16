import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TaskManagerContext } from "../context/TaskManagerContext";
import { IoReturnUpBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { EditTask } from "./EditTask";

export const Task = () => {
  const { taskId } = useParams();
  const [newTask, setNewTask] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const {
    capitalizeFirstLetter,
    setEditTaskPanel,
    selectedTask,
    setSelectedTask,
  } = useContext(TaskManagerContext);
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/getTask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        setNewTask(response.data.data);
        setSelectedTask(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (selectedTask) {
      setNewTask(selectedTask);
    }
  }, [selectedTask]);

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  if (!newTask) return <p>Loading...</p>;

  return (
    <div className="h-screen px-4 py-3">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-5">
          <IoReturnUpBack
            onClick={() => navigate(-1)}
            className="text-3xl text-[#43754C]"
          />
          <h1 className="text-2xl text-[#43754C] font-bold truncate max-w-[50vw]">
            {capitalizeFirstLetter(newTask.title)}
          </h1>
        </div>
        <TbEdit
          className="text-2xl text-[#43754C] cursor-pointer"
          onClick={() => setEditTaskPanel(true)}
        />
      </div>

      <div className="bg-[#8ABC94] text-white font-semibold rounded-2xl px-4 py-3 max-w-full wrap-break-word leading-relaxed shadow-md">
        <p>{capitalizeFirstLetter(newTask.description)}</p>
        <p className="text-sm text-gray-200 mt-1">
          Due Date: {new Date(newTask.dueDate).toLocaleDateString()}
        </p>
      </div>
      <EditTask />
    </div>
  );
};
