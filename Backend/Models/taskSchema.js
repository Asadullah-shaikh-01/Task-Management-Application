import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
   Title: {
      type: String,

   },
   Description: {
      type: String,
   },
   Status: {
      type: String,
      enum: ["Compeleted", "pending"],
      default: "pending",
   },
   Archived: {
      type: Boolean,
      default: false,
   },
   createdBy: {
      type: mongoose.Schema.ObjectId,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },

})

export const Task = mongoose.model("Task", taskSchema)