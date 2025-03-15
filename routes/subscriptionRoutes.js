const express = require("express");
const router = express.Router();
const {
  createSubscription,
  getSubscriptions,
  buySubscription,
  checkSubscription,
} = require("../controllers/subscriptionController");
const { authMiddleware } = require("../middleware/authMiddleware");


// ✅ Create Subscription (Admin only)
router.post("/create", authMiddleware, createSubscription);

// ✅ Get All Subscriptions (Public)
router.get("/", getSubscriptions);

// ✅ Buyer Purchases Subscription
router.post("/buy", authMiddleware, buySubscription);

// ✅ Check Buyer's Active Subscription
router.get("/check", authMiddleware, checkSubscription);

module.exports = router;
