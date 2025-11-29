const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { register, login, getProfile, updateProfile } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getProfile);
router.patch("/me", auth, updateProfile);

module.exports = router;
