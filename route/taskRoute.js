import express from "express";
import { getTask, createTask, getAllTask, updateTask, getTaskById, deleteTask } from "../controller/taskController.js";
import { auth } from "../middleware/login.js";
const taskRoute = express.Router();

taskRoute.get('/task', auth, getTask);
taskRoute.post('/task',auth , createTask);
taskRoute.get('/alltask', auth, getAllTask);
taskRoute.put('/task/:id', auth, updateTask);
taskRoute.get('/task/:id', auth, getTaskById);
taskRoute.delete('/task/:id', auth, deleteTask);

export default taskRoute;