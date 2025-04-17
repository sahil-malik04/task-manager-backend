const {
  createTaskUser,
  getTasksUser,
  updateTaskUser,
  deleteTaskUser,
} = require("../services/taskService");
const Task = require("../models/Task");
const { status } = require("../utils/status");
const { alertMessages } = require("../utils/constants");

jest.mock("../models/Task");

describe("Task module test cases -", () => {
  // for creating a task
  it("should create a task successfully", async () => {
    Task.create.mockResolvedValue({
      _id: "1",
      title: "Test Task",
      description: "Test Description",
    });

    const payload = {
      userId: "680001c2e9b4a5e7849ce6f8",
      title: "demo",
      description: "demo task 2",
      taskStatus: "pending",
    };

    const response = await createTaskUser(payload);

    expect(response.status).toBe(status.OK);
    expect(response.message).toBe(alertMessages.TASK_CREATED);
  });

  // for getting tasks
  it("should return tasks", async () => {
    Task.find.mockReturnValue({
      sort: jest
        .fn()
        .mockReturnValue([{ title: "Task 1" }, { title: "Task 2" }]),
    });

    const response = await getTasksUser();

    expect(response.status).toBe(status.OK);
    expect(response.data.length).toBe(2);
  });

  // for updating a task
  it("should update a task successfully", async () => {
    Task.findByIdAndUpdate.mockResolvedValue({ title: "Updated Task" });

    const payload = {
      title: "Updated Task",
      description: "Updated Description",
      taskStatus: "Completed",
    };

    const response = await updateTaskUser(payload, "task_id");

    expect(response.status).toBe(status.OK);
    expect(response.message).toBe(alertMessages.SUCCESS);
  });

  // for deleting a task
  it("should delete a task successfully", async () => {
    Task.findByIdAndDelete.mockResolvedValue({ title: "Deleted Task" });

    const response = await deleteTaskUser("task_id");

    expect(response.status).toBe(status.OK);
    expect(response.message).toBe(alertMessages.TASK_DELETED);
  });
});
