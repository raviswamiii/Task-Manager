import express from "express";
import {createTask, getTasks, getTask} from "../controllers/taskController.js";
const taskRouter = express.Router();

taskRouter.post("/createTask", createTask);
taskRouter.get("/getTasks", getTasks);
taskRouter.get("/getTask/:taskId", getTask);

export default taskRouter;