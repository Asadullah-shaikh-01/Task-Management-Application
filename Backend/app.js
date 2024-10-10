import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { dbConnection } from "./database/dbConnection.js";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js"
import userRouter from "./routes/userRouter.js"
import taskRouter from "./routes/taskRouter.js"
const app = express();
dotenv.config({ path: "./config/config.env" });


// forntend Middelware 
// connected to fronend to backend
app.use(cors({
  origin: [process.env.FRONTEND_ULR],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}))

// Middelware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Images Uploadfiles
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Router paths for User
app.use("/api/v1/user", userRouter);
// Router paths for task
app.use("/api/v1/task", taskRouter);


// Database connections
dbConnection();

// Error Middlewares
app.use(errorMiddleware);


export default app;