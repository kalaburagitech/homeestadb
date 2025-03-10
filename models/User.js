const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["buyer", "seller"], required: true },
  otp: { type: String },
  otpExpires: { type: Date },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
