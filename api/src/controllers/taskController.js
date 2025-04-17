const { successAction, failAction } = require("../utils/responseAction");
const {
  createTaskUser,
  getTasksUser,
  updateTaskUser,
  deleteTaskUser,
} = require("../services/taskService");

exports.createTask = async function (req, res) {
  try {
    const payload = req.body;
    const result = await createTaskUser(payload);
    res.status(result.status).json(successAction(result));
  } catch (err) {
    res.status(err.status).json(failAction(err));
  }
};

exports.getTasks = async function (req, res) {
  try {
    const result = await getTasksUser();
    res.status(result.status).json(successAction(result));
  } catch (err) {
    res.status(err.status).json(failAction(err));
  }
};

exports.updateTask = async function (req, res) {
  try {
    const { taskId } = req.params;
    const payload = req.body;
    const result = await updateTaskUser(payload, taskId);
    res.status(result.status).json(successAction(result));
  } catch (err) {
    res.status(err.status).json(failAction(err));
  }
};

exports.deleteTask = async function (req, res) {
  try {
    const { taskId } = req.params;
    const result = await deleteTaskUser(taskId);
    res.status(result.status).json(successAction(result));
  } catch (err) {
    res.status(err.status).json(failAction(err));
  }
};
