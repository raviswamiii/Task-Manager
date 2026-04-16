import express from "express";
import {createTask, getTasks, getTask, deleteTask, updateTask, toggleTask} from "../controllers/taskController.js";
import userAuth from "../middleware/userAuth.js";
const taskRouter = express.Router();

taskRouter.post("/createTask", userAuth, createTask);
taskRouter.get("/getTasks", userAuth, getTasks);
taskRouter.get("/getTask/:taskId", userAuth, getTask);
taskRouter.patch("/updateTask/:taskId", userAuth, updateTask);
taskRouter.delete("/deleteTask/:taskId", userAuth, deleteTask);
taskRouter.patch("/toggleTask/:taskId", userAuth, toggleTask);

export default taskRouter;