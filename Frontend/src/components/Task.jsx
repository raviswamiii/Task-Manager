import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Task = () => {
  const { taskId } = useParams();
  const [newTask, setNewTask] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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
      <h1 className="text-2xl font-bold">{newTask.title}</h1>
      <p>{newTask.description}</p>
    </div>
  );
};