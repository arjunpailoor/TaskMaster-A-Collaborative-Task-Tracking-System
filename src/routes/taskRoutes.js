const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createTask, myTasks, tasksByTeam, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/my", auth, myTasks);
router.get("/team/:id", auth, tasksByTeam);
router.patch("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
