import { createContext, useState } from "react";

export const TaskManagerContext = createContext();

export const TaskManagerProvider = ({ children }) => {
  const [addTaskPanel, setAddTaskPanel] = useState(false);

  const value = {
    addTaskPanel,
    setAddTaskPanel,
  };

  return (
    <TaskManagerContext.Provider value={value}>
      {children}
    </TaskManagerContext.Provider>
  );
};
