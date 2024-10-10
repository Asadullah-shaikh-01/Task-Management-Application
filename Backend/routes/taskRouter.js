import { createTask, deleteTask, updateTask, getSingleTask, getmyTask } from "../controller/taskController.js"
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/createtask', isAuthenticated, createTask);
router.delete('/delete/:id', isAuthenticated, deleteTask);
router.put('/update/:id', isAuthenticated, updateTask);
router.get('/mytask', isAuthenticated, getmyTask);
router.get('/singletask/:id', isAuthenticated, getSingleTask);


export default router;