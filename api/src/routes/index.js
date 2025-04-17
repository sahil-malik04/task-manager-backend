const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const taskRoutes = require("./taskRoutes");

// default route
router.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
