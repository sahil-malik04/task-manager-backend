const { router } = require("../utils/express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);

module.exports = router;
