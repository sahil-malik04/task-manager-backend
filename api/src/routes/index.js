const { router } = require("../utils/express");
const authRoutes = require("./authRoutes");
const taskRoutes = require("./taskRoutes");

// default route
router.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
