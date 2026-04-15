import React, { useContext, useState, useEffect } from "react";
import { TaskManagerContext } from "../context/TaskManagerContext";
import axios from "axios";
import { IoReturnUpBack } from "react-icons/io5";

export const EditTask = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editTaskError, setEditTaskError] = useState("");
  const [editTaskLoader, setEditTaskLoader] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const {
    editTaskPanel,
    setEditTaskPanel,
    selectedTask,
    setSelectedTask,
    setTasks,
  } = useContext(TaskManagerContext);

  useEffect(() => {
    if (selectedTask) {
      setEditTitle(selectedTask.title);
      setEditDescription(selectedTask.description);
    }
  }, [selectedTask]);

  const handleEditTask = async (e) => {
    e.preventDefault();

    if (!editTitle.trim() && !editDescription.trim()) {
      setEditTaskError("Nothing to update");
      return;
    }

    setEditTaskLoader(true);
    setEditTaskError("");

    try {
      const updatedData = {};

      if (editTitle.trim()) updatedData.title = editTitle;
      if (editDescription.trim()) updatedData.description = editDescription;
      if (editDueDate) updatedData.dueDate = editDueDate;

      const response = await axios.patch(
        `${backendURL}/api/updateTask/${selectedTask._id}`,
        updatedData,
      );

      if (response.data.success) {
        const updatedTask = response.data.data;

        setTasks((prev) =>
          prev.map((task) =>
            task._id === updatedTask._id ? updatedTask : task,
          ),
        );

        setSelectedTask(updatedTask);

        setEditTaskPanel(false);
        setEditTitle("");
        setEditDescription("");
      }
    } catch (error) {
      setEditTaskError(error.response?.data?.message || error.message);
    } finally {
      setEditTaskLoader(false);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center gap-4 items-center fixed top-0 right-0 h-screen w-full z-20 bg-white transform transition-transform duration-300 ease-in-out ${
        editTaskPanel ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Back Button */}
      <IoReturnUpBack
        onClick={() => setEditTaskPanel(false)}
        className="text-3xl text-[#43754C] absolute top-2 left-4 cursor-pointer"
      />

      <h1 className="text-[#8ABC94] font-bold text-xl">EDIT TASK</h1>

      {/* ✅ Form */}
      <form
        onSubmit={handleEditTask}
        className="flex flex-col items-center gap-4 w-[70vw] rounded-xl"
      >
        <input
          className="w-full px-2 py-2 border-2 border-[#8ABC94] outline-none rounded-xl"
          type="text"
          placeholder="Title..."
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <textarea
          className="h-[15vh] w-full px-2 py-2 border-2 border-[#8ABC94] outline-none rounded-xl"
          type="text"
          placeholder="Description..."
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />

        <input
          type="date"
          className="w-full px-2 py-2 border-2 border-[#8ABC94] outline-none rounded-xl"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
        />

        <button
          type="submit"
          disabled={editTaskLoader}
          className={`w-full py-2 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition ${
            editTaskLoader
              ? "bg-[#8ABC84] cursor-not-allowed"
              : "bg-[#8ABC94] hover:bg-[#7bb07e] cursor-pointer"
          }`}
        >
          {editTaskLoader ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Updating...</span>
            </>
          ) : (
            "Update"
          )}
        </button>
      </form>

      {editTaskError && (
        <p className="text-red-400 text-center text-sm px-2 rounded-md">
          {editTaskError}
        </p>
      )}
    </div>
  );
};
