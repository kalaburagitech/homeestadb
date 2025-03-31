const express = require("express");
const { registerUser, loginUser, generateOTP, verifyOTP } = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     description: Register a new user
 *     parameters:
 *       - name: user
 *         in: body
 *         description: User object with email, password, etc.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login a user
 *     parameters:
 *       - name: credentials
 *         in: body
 *         description: User's email and password
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/generate-otp:
 *   post:
 *     description: Generate an OTP for a user
 *     parameters:
 *       - name: email
 *         in: body
 *         description: User's email to send OTP
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Error sending OTP
 */
router.post("/generate-otp", generateOTP);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     description: Verify the OTP sent to the user
 *     parameters:
 *       - name: otp
 *         in: body
 *         description: OTP to verify
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             otp:
 *               type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */
router.post("/verify-otp", verifyOTP);

module.exports = router;
