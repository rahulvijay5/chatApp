const Task = require("../models/taskModel");
const { MongoClient, ObjectId } = require("mongodb");

const createTask = async (req, res) => {
  // console.log("i am called");
  try {
    // console.log("Once I got here")
    // console.log(req.body)
    const { task, done, dueDate, userId } = req.body;
    console.log(req.body);
    const newTask = new Task({
      userId,
      task,
      done,
      dueDate,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    // Retrieve userId from query parameters
    const userId = req.query.userId;

    // Find tasks based on userId. If userId is not provided, it will return all tasks
    const query = userId ? { userId: userId } : {};
    const Tasks = await Task.find(query);

    res.json({ Tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};


const getTaskOne = async (req, res) => {
  const userId = req.query.userId; // Retrieve userId from query parameters
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({
      _id: new ObjectId(taskId),
      userId: userId,
    });

    if (task) {
      res.json({ task });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    // Find and remove the task by its ID
    const result = await Task.findOneAndDelete({ _id: taskId });

    if (result) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  // console.log(req.body)
  try {
    const taskId = req.body.taskId;
    const updatedTask = req.body.task;
    const done = req.body.done;
    const dueDate = req.body.dueDate;
    const result = await Task.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { task: updatedTask, done: done, dueDate: dueDate } }
    );

    if (result.modifiedCount > 0) {
      console.log("Update successful:", result);
      res.json({ success: true });
    } else {
      console.error("Error updating todo: Task not found");
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  getTaskOne,
  deleteTask,
};
