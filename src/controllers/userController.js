const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /users/register
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "name, email, password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();

    return res.status(201).json({ id: user._id, name: user.name, email: user.email, createdAt: user.createdAt });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// POST /users/login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /users/me
async function getProfile(req, res) {
  // req.user populated by auth middleware
  return res.json({ id: req.user._id, name: req.user.name, email: req.user.email, createdAt: req.user.createdAt });
}

// PATCH /users/me
async function updateProfile(req, res) {
  try {
    const allowed = {};
    if (req.body.name) allowed.name = req.body.name;
    if (req.body.password) allowed.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.findByIdAndUpdate(req.user._id, allowed, { new: true }).select("-password");
    return res.json({ id: user._id, name: user.name, email: user.email, updatedAt: user.updatedAt });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { register, login, getProfile, updateProfile };
