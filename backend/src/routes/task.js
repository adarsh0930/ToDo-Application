const express = require("express");
const authorize = require("../middleware/auth");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

const router = express.Router();

router.post("", authorize, createTask);
router.get("", authorize, getTasks);
router.get("/:id", authorize, getTaskById);
router.patch("/:id", authorize, updateTask);
router.delete("/:id", authorize, deleteTask);

module.exports = router;
