const { ObjectId } = require("mongodb");
const client = require("./db");

const dbName = process.env.DATABASE;
const db = client.db(dbName);
const tasksCollection = db.collection("tasks");

async function createTask(title, description, userId) {
  const newTask = {
    title,
    description,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId,
    isDeleted: false,
  };
  const task = await tasksCollection.insertOne(newTask);
  newTask.id = task.insertedId;
  return newTask;
}

async function getTasksByUserId(userId) {
  const cursor = tasksCollection.find({ userId, isDeleted: false });
  const tasks = await cursor.toArray();
  return tasks;
}

async function getTaskById(id, userId) {
  const task = await tasksCollection.findOne({
    _id: new ObjectId(id),
    userId,
    isDeleted: false,
  });
  return task;
}

async function updateTask(id, updateParams) {
  await tasksCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: updateParams,
    }
  );
}

async function deleteTask(id) {
  await tasksCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        isDeleted: true,
      },
    }
  );
}

module.exports = {
  createTask,
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask,
};
// id, userId
