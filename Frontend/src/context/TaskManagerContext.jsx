import { createContext, useState } from "react";

export const TaskManagerContext = createContext();

export const TaskManagerProvider = ({ children }) => {
  const [addTaskPanel, setAddTaskPanel] = useState(false);
  const [editTaskPanel, setEditTaskPanel] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const value = {
    addTaskPanel,
    setAddTaskPanel,
    tasks,
    setTasks,
    selectedTask,
    setSelectedTask,
    capitalizeFirstLetter,
    editTaskPanel,
    setEditTaskPanel,
  };

  return (
    <TaskManagerContext.Provider value={value}>
      {children}
    </TaskManagerContext.Provider>
  );
};
