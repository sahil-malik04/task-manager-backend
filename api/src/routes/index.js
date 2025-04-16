const { router } = require("../utils/express");
const authRoutes = require("./authRoutes");

// default route
router.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});
router.use("/auth", authRoutes);

module.exports = router;
