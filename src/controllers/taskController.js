const Task = require("../models/Task");

// POST /tasks  create
async function createTask(req, res) {
  try {
    const { title, description, dueDate, assigneeId, teamId } = req.body;
    if (!title) return res.status(400).json({ message: "title required" });

    const task = new Task({
      title,
      description: description || "",
      dueDate: dueDate ? new Date(dueDate) : null,
      creator: req.user._id,
      assignee: assigneeId || null,
      team: teamId || null
    });

    await task.save();
    return res.status(201).json(task);
  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /tasks/my  tasks assigned to me OR created by me
async function myTasks(req, res) {
  const tasks = await Task.find({ $or: [{ assignee: req.user._id }, { creator: req.user._id }] }).populate("assignee", "name email").populate("team", "name");
  return res.json(tasks);
}

// GET /tasks/team/:id
async function tasksByTeam(req, res) {
  const tasks = await Task.find({ team: req.params.id }).populate("assignee", "name email");
  return res.json(tasks);
}

// PATCH /tasks/:id  update (partial). cannot change creator
async function updateTask(req, res) {
  try {
    const allowed = {};
    const { title, description, dueDate, status, assigneeId } = req.body;
    if (title) allowed.title = title;
    if (description) allowed.description = description;
    if (dueDate) allowed.dueDate = new Date(dueDate);
    if (status) allowed.status = status;
    if (assigneeId) allowed.assignee = assigneeId;

    const task = await Task.findByIdAndUpdate(req.params.id, allowed, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// DELETE /tasks/:id
async function deleteTask(req, res) {
  const t = await Task.findByIdAndDelete(req.params.id);
  if (!t) return res.status(404).json({ message: "Task not found" });
  return res.json({ message: "Deleted" });
}

module.exports = { createTask, myTasks, tasksByTeam, updateTask, deleteTask };
