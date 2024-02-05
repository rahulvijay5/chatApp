const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cron = require("node-cron");
const Task = require("./src/models/taskModel");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const taskRoutes = require("./src/routes/taskRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use("/", taskRoutes);

app.use("/auth", authRoutes);

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.DB_URI);

    db.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    db.connection.once("open", () => {
      console.log("Connected to MongoDB");
    });

    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

function startServer() {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

connectDB().then(startServer());

// Schedule a task to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running a task every day at midnight");

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    // Delete tasks that are older than 7 days
    await Task.deleteMany({ createdAt: { $lt: sevenDaysAgo } });
    console.log("Old tasks deleted successfully");
  } catch (error) {
    console.error("Error deleting old tasks:", error);
  }
});

cron.schedule("0 0 * * *", async () => {
  console.log("Running a task every day at midnight");

  const date = new Date();
  const oneMinuteAgo = new Date(date.getTime() - 1 * 60 * 1000);
  const tenDaysAgoTime = date.setDate(date.getDate() - 10);
  const tenDaysAgo = new Date(tenDaysAgoTime);
  try {
    const result = await Task.deleteMany({
      updatedAt: { $lt: tenDaysAgo },
    });
    console.log(
      `${result.deletedCount} tasks older than 10 days deleted successfully`
    );
  } catch (error) {
    console.error("Error deleting tasks:", error);
  }
});
