const express = require("express");
const router = express.Router();
const {
  createSubscription,
  getSubscriptions,
  buySubscription,
  checkSubscription,
} = require("../controllers/subscriptionController");
const { authMiddleware } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/subscriptions/create:
 *   post:
 *     description: Create a new subscription (Admin only)
 *     parameters:
 *       - name: subscription
 *         in: body
 *         description: Subscription details to create
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             plan:
 *               type: string
 *             price:
 *               type: number
 *               format: float
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create", authMiddleware, createSubscription);

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     description: Get all subscriptions
 *     responses:
 *       200:
 *         description: List of subscriptions
 */
router.get("/", getSubscriptions);

/**
 * @swagger
 * /api/subscriptions/buy:
 *   post:
 *     description: Buyer purchases a subscription
 *     responses:
 *       200:
 *         description: Subscription purchased successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/buy", authMiddleware, buySubscription);

/**
 * @swagger
 * /api/subscriptions/check:
 *   get:
 *     description: Check a buyer's active subscription
 *     responses:
 *       200:
 *         description: Active subscription
 *       404:
 *         description: No active subscription
 */
router.get("/check", authMiddleware, checkSubscription);

module.exports = router;
