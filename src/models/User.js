const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, immutable: true },
  password: { type: String, required: true }, // hashed
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre("save", function () { this.updatedAt = Date.now(); });

module.exports = mongoose.model("User", userSchema);
