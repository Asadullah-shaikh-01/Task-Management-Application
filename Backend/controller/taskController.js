import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";
import { Task } from './../Models/taskSchema.js';

// Task Created Controller
export const createTask = catchAsyncErrors(async (req, res, next) => {
    const { Title, Description } = req.body;
    const createdBy = req.user._id;
    const task = await Task.create({
        Title,
        Description,
        createdBy,
    });
    res.status(201).json({
        success: true,
        task,
        message: "Task is Created Successfuly",
    })
});

// Task Deleted controller
export const deleteTask = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
        return next(new ErrorHandler("Task Not found", 400));

    }
    await task.deleteOne();
    res.status(201).json({
        success: true,
        message: "Task Deleted Successfuly",
    });
});
// Task update controller
export const updateTask = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
        return next(new ErrorHandler("Task Not found", 400));
    };
    task = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(201).json({
        success: true,
        message: "Task Update Successfuly",
    })
});
export const getmyTask = catchAsyncErrors(async (req, res, next) => {
    const user = req.user._id;
    const tasks = await Task.find({ createdBy: user });
    res.status(201).json({
        success:true,
        tasks,
    })
});
export const getSingleTask = catchAsyncErrors(async (req, res, next) => {   const user = req.user._id;
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
        return next(new ErrorHandler("Task Not found", 400));
    }; 
    res.status(201).json({
        success:true,
        task,
    })});
