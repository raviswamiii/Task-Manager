import { createContext, useState } from "react";

export const TaskManagerContext = createContext();

export const TaskManagerProvider = ({ children }) => {
  const [addTaskPanel, setAddTaskPanel] = useState(false);
    const [tasks, setTasks] = useState([]);

  const value = {
    addTaskPanel,
    setAddTaskPanel,
    tasks,
    setTasks
  };

  return (
    <TaskManagerContext.Provider value={value}>
      {children}
    </TaskManagerContext.Provider>
  );
};
