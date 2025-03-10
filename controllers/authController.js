const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.registerUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    let userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) return res.status(400).json({ message: "Email or phone already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, phone, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
  
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
  
    // Generate token with user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role },  // Include role
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  };

exports.generateOTP = async (req, res) => {
  const { emailOrPhone } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 mins
    await user.save();

    console.log(`OTP sent to ${emailOrPhone}: ${otp}`); // Replace this with an SMS/email service

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { emailOrPhone, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }], otp, otpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
