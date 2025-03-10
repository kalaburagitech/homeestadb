const express = require("express");
const { registerUser, loginUser, generateOTP, verifyOTP } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/generate-otp", generateOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;
