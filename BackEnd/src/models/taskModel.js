const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: String,
    userId: String,
    done: Boolean,
    dueDate: { type: String, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = Task;
