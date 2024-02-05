const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const register = async (req, res) => {
  console.log("hello, new user")
  try {
    const { userName, email } = req.body;
    console.log(req.body);

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const userEmail = await User.findOne({email})
    if (userEmail) {
      return res.status(400).json({ error: "Email already in use!" });
    }

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      userName,
      email,
      password,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password!" });
    }

    // Create and assign a token
    const token = jwt.sign(
      { userId: user._id, username: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
    });
    console.log("Logged in successfully", {
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  console.log(req.body.oldPassword);
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    // console.log(hashedPassword);
    if (!isMatch) {
      // console.log("galat")
      return res.status(400).json({ error: "Incorrect old password!" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  changePassword,
};
