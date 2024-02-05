const express = require("express");
const router = express.Router();
const { createTask, getTask, updateTask, getTaskOne, deleteTask } = require("../controllers/taskController");

router.get("/", (req, res) => {
  res.send("This is the server running of todoList Application of Sagar");
});

router.post("/newToDo", createTask);

router.get("/getToDo", getTask)

router.get("/getTask/:id", getTaskOne);

router.post("/updateToDo", updateTask);

router.delete("/deleteTodo/:taskId", deleteTask);

// Get user (for example)
// router.get("/api/users/addUser", async (req, res) => {
//   // Implement logic to get user(s)
//   console.log("Hello")
//   res.status(200).json({ message: "GET request handled" });
// });

module.exports = router;
