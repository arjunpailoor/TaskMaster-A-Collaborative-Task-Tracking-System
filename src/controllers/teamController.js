const Team = require("../models/Team");
const User = require("../models/User");

// POST /teams  create team
async function createTeam(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "name required" });

    const team = new Team({ name, members: [req.user._id] });
    await team.save();
    return res.status(201).json(team);
  } catch (err) {
    console.error("CREATE TEAM ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// POST /teams/:id/join  add user to team by id
async function joinTeam(req, res) {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.members.includes(req.user._id)) {
      team.members.push(req.user._id);
      await team.save();
    }
    return res.json(team);
  } catch (err) {
    console.error("JOIN TEAM ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /teams/:id
async function getTeam(req, res) {
  const team = await Team.findById(req.params.id).populate("members", "name email");
  if (!team) return res.status(404).json({ message: "Team not found" });
  return res.json(team);
}

module.exports = { createTeam, joinTeam, getTeam };
