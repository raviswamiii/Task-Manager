import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TaskManagerProvider } from "./context/TaskManagerContext.jsx";

createRoot(document.getElementById("root")).render(
  <TaskManagerProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </TaskManagerProvider>,
);
