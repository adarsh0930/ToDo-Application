function formatTask(task) {
  return {
    id: task._id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

module.exports = {
  formatTask,
  isDefined,
};
