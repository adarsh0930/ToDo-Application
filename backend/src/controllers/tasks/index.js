const validator = require("validator");
const TasksModel = require("../../models/task");
const { formatTask, isDefined } = require("./utils");

async function getTasks(req, res) {
  try {
    const tasks = await TasksModel.getTasksByUserId(req.user._id);
    const formattedTasks = tasks.map(formatTask);
    return res.send({ tasks: formattedTasks });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function getTaskById(req, res) {
  try {
    const task = await TasksModel.getTaskById(req.params.id, req.user._id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.send({ task: formatTask(task) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .send({ error: "Title and description are mandatory" });
    }

    const task = await TasksModel.createTask(title, description, req.user._id);
    return res.status(201).send(formatTask(task));
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function updateTask(req, res) {
  try {
    const { title, description, completed } = req.body;

    if (isDefined(completed) && typeof completed !== "boolean") {
      return res
        .status(400)
        .send({ error: "Task completed property must be a boolean" });
    }

    if (isDefined(title) && validator.isEmpty(title)) {
      return res.status(400).send({ error: "Title can not be empty" });
    }

    if (isDefined(description) && validator.isEmpty(description)) {
      return res.status(400).send({ error: "Description can not be empty" });
    }

    const { id: taskId } = req.params;
    const task = await TasksModel.getTaskById(taskId, req.user._id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updateParams = {
      ...req.body,
      updatedAt: new Date(),
    };
    await TasksModel.updateTask(taskId, updateParams);

    const updatedTask = {
      ...task,
      ...updateParams,
    };
    res.send({ task: formatTask(updatedTask) });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function deleteTask(req, res) {
  try {
    const { id: taskId } = req.params;
    const taskToDelete = await TasksModel.getTaskById(taskId, req.user._id);
    if (!taskToDelete) {
      return res.status(404).json({ error: "Task not found" });
    }

    await TasksModel.deleteTask(taskId);
    res.send(formatTask(taskToDelete));
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
