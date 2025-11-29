const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createTeam, joinTeam, getTeam } = require("../controllers/teamController");

router.post("/", auth, createTeam);
router.post("/:id/join", auth, joinTeam);
router.get("/:id", auth, getTeam);

module.exports = router;
