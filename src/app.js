const express = require("express");
const app = express();

app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const teamRoutes = require("./routes/teamRoutes");

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/teams", teamRoutes);

app.get("/", (req, res) => res.json({ message: "TaskMaster API running" }));

module.exports = app;
