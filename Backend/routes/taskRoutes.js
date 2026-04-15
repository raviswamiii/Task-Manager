import express from "express";
import {createTask} from "../controllers/taskController.js";
const taskRouter = express.Router();

taskRouter.post("/tasks", createTask);

export default taskRouter;