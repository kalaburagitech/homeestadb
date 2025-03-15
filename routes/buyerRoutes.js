const express = require("express");
const router = express.Router();
const { getSubscriptions, buyProperty } = require("../controllers/buyerController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Get all subscriptions
router.get("/subscriptions", authMiddleware, getSubscriptions);

// Buy a property (requires subscription)
router.post("/buy/:propertyId", authMiddleware, buyProperty);

module.exports = router;
