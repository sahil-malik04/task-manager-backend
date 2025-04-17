const { failResponse, successResponse } = require("../utils/response");
const { status } = require("../utils/status");
const Task = require("../models/Task");
const { alertMessages } = require("../utils/constants");

async function createTaskUser(payload) {
  const { userId, title, description, taskStatus } = payload;
  try {
    if (userId) {
      if (!title || !description) {
        return failResponse(status.BAD_REQUEST, alertMessages.TASK_VALIDATE);
      }

      const savedTask = await Task.create({
        userId,
        title,
        description,
        status: taskStatus,
      });
      if (savedTask) {
        const info = {
          taskId: savedTask?._id,
        };
        return successResponse(status.OK, alertMessages.TASK_CREATED, info);
      }
    } else {
      return failResponse(status.BAD_REQUEST, alertMessages.ID_REQUIRED);
    }
  } catch (error) {
    throw failResponse(status.SERVER_FAILURE, error?.message);
  }
}

async function getTasksUser() {
  try {
    const result = await Task.find().sort({ createdAt: -1 });
    return successResponse(status.OK, alertMessages.SUCCESS, result);
  } catch (error) {
    throw failResponse(status.SERVER_FAILURE, error?.message);
  }
}

async function updateTaskUser(payload, taskId) {
  const { title, description, taskStatus } = payload;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status: taskStatus },
      { new: true }
    );

    if (!updatedTask) {
      return failResponse(status.BAD_REQUEST, alertMessages.TASK_NOT_FOUND);
    }
    return successResponse(status.OK, alertMessages.SUCCESS, updatedTask);
  } catch (error) {
    throw failResponse(status.SERVER_FAILURE, error?.message);
  }
}

async function deleteTaskUser(taskId) {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return failResponse(status.BAD_REQUEST, alertMessages.TASK_NOT_FOUND);
    }

    return successResponse(status.OK, alertMessages.TASK_DELETED);
  } catch (error) {
    throw failResponse(status.SERVER_FAILURE, error?.message);
  }
}

module.exports = {
  createTaskUser,
  getTasksUser,
  updateTaskUser,
  deleteTaskUser,
};
