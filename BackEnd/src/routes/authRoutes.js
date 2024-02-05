const express = require("express");
const router = express.Router();
const { login, register, changePassword } = require("../controllers/authController");



router.post("/login", login);
router.post("/register", register);
router.post("/changePassword", changePassword);

module.exports = router;
