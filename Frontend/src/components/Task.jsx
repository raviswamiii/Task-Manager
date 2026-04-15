import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TaskManagerContext } from "../context/TaskManagerContext";
import { IoReturnUpBack } from "react-icons/io5";

export const Task = () => {
  const { taskId } = useParams();
  const [newTask, setNewTask] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { capitalizeFirstLetter } = useContext(TaskManagerContext);
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/getTask/${taskId}`);
      if (response.data.success) {
        setNewTask(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
        <p className="px-3 py-1 text-sm bg-[#8ABC94] rounded-md text-white font-semibold">
          Add Task
        </p>
      </div>

      <p className="bg-[#8ABC94] text-white rounded-2xl px-4 py-3 max-w-full wrap-break-word leading-relaxed shadow-md">
        {capitalizeFirstLetter(newTask.description)}
      </p>
    </div>
  );
};
