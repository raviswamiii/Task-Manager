import React, { useContext, useState } from "react";
import { TaskManagerContext } from "../context/TaskManagerContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddTask = () => {
  const { addTaskPanel, setAddTaskPanel } = useContext(TaskManagerContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addTaskError, setAddTaskError] = useState("");
  const [addTaskLoader, setAddTaskLoader] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddTaskLoader(true);
    setAddTaskError("");

    try {
      const response = await axios.post(`${backendURL}/api/tasks`, {
        title,
        description,
      });

      if (response.data.success) {
        setAddTaskPanel(false)
        setTitle("");
        setDescription("");
      } else {
        setAddTaskError(response.data.message);
      }
    } catch (error) {
      setAddTaskError(
        error.response?.data?.message ||
          error.message,
      );
    } finally {
      setAddTaskLoader(false);
    }
  };
  return (
    <div
      className={`flex flex-col justify-center gap-2 items-center fixed top-0 right-0 h-screen w-full z-20 bg-white transform transition-transform duration-300 ease-in-out ${addTaskPanel ? "translate-x-0" : "translate-x-full"}`}
    >
      <h1 className="text-[#8ABC94] font-bold text-2xl">ADD TASK</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-[70vw] rounded-xl"
      >
        <input
          className="w-full px-2 py-2 border-2 border-[#8ABC94] outline-none rounded-xl"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full px-2 py-2 border-2 border-[#8ABC94] outline-none rounded-xl"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
  type="submit"
  disabled={addTaskLoader}
  className={`w-full py-2 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition ${
    addTaskLoader
      ? "bg-[#8ABC84] cursor-not-allowed"
      : "bg-[#8ABC94] hover:bg-[#7bb07e] cursor-pointer"
  }`}
>
  {addTaskLoader ? (
    <>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>Adding...</span>
    </>
  ) : (
    "Add"
  )}
</button>
      </form>

      {addTaskError && (
        <p className="text-red-400 text-center text-sm px-2 rounded-md">
          {addTaskError}
        </p>
      )}
    </div>
  );
};
