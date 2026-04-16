import React, { useContext, useState } from "react";
import { TaskManagerContext } from "../context/TaskManagerContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoReturnUpBack } from "react-icons/io5";

export const AddTask = () => {
  const { addTaskPanel, setAddTaskPanel, setTasks } =
    useContext(TaskManagerContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [addTaskError, setAddTaskError] = useState("");
  const [addTaskLoader, setAddTaskLoader] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddTaskLoader(true);
    setAddTaskError("");

    try {
      if (!title.trim() || !description.trim() || !dueDate) {
        setAddTaskError("All fields are required");
        setAddTaskLoader(false);
        return;
      }
      const response = await axios.post(
        `${backendURL}/api/createTask`,
        {
          title,
          description,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setTasks((prev) => [response.data.data, ...prev]);

        setAddTaskPanel(false);
        setTitle("");
        setDescription("");
        setDueDate("");

        navigate(`/task/${response.data.data._id}`);
      } else {
        setAddTaskError(response.data.message);
      }
    } catch (error) {
      setAddTaskError(error.response?.data?.message || error.message);
    } finally {
      setAddTaskLoader(false);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center fixed top-0 right-0 h-screen w-full z-20 bg-white transform transition-transform duration-300 ease-in-out ${addTaskPanel ? "translate-x-0" : "translate-x-full"}`}
    >
      <IoReturnUpBack
        onClick={() => setAddTaskPanel(false)}
        className="text-3xl text-[#43754C] absolute top-2 left-4 cursor-pointer"
      />

      <h1 className="text-[#8ABC94] font-bold text-xl mb-4">ADD NEW TASK</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-[70vw] rounded-xl"
      >
        <input
          className="w-full px-2 py-2 border-2 border-[#8ABC94] outline-none rounded-xl"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="h-[15vh] w-full px-2 py-2 border-2 border-[#8ABC94] outline-none rounded-xl"
          type="text"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="w-full px-2 py-2 border-2 border-[#8ABC94] outline-none rounded-xl"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
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
        <p className="text-red-400 text-center text-sm px-2 rounded-md mt-1">
          {addTaskError}
        </p>
      )}
    </div>
  );
};
