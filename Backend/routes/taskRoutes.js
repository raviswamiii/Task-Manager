import express from "express";
import {createTask, getTasks, getTask, deleteTask} from "../controllers/taskController.js";
const taskRouter = express.Router();

taskRouter.post("/createTask", createTask);
taskRouter.get("/getTasks", getTasks);
taskRouter.get("/getTask/:taskId", getTask);
taskRouter.delete("/deleteTask/:taskId", deleteTask);

export default taskRouter;