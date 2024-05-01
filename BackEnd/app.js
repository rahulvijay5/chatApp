const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");

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
