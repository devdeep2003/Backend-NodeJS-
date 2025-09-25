import { Router } from "express";
import taskModel from "../models/task.Schema.js";
import { authValidate } from "../middleware/auth.middleware.js";
import { fetchTasks, createTask, deleteTask, updateTask } from "../controllers/task.controller.js";

const router = Router();

router.get("/tasks/:id", authValidate, fetchTasks);
router.post("/create-task/:id", authValidate, createTask);
router.delete("/delete-task/:id", authValidate, deleteTask);
router.put("/update-task/:id", authValidate, updateTask);

export default router;
