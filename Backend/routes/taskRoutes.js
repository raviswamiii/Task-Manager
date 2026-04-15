import express from "express";
import {createTask, getTasks} from "../controllers/taskController.js";
const taskRouter = express.Router();

taskRouter.post("/createTask", createTask);
taskRouter.get("/getTasks", getTasks);

export default taskRouter;