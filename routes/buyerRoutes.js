const express = require("express");
const router = express.Router();
const { getSubscriptions, buyProperty } = require("../controllers/buyerController");
const { authMiddleware } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/buyers/subscriptions:
 *   get:
 *     description: Get all subscriptions for a buyer (authentication required)
 *     responses:
 *       200:
 *         description: A list of subscriptions
 *       401:
 *         description: Unauthorized
 */
router.get("/subscriptions", authMiddleware, getSubscriptions);

/**
 * @swagger
 * /api/buyers/buy/{propertyId}:
 *   post:
 *     description: Buy a property (requires subscription)
 *     parameters:
 *       - name: propertyId
 *         in: path
 *         description: Property ID to buy
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Property purchased successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid property ID or subscription error
 */
router.post("/buy/:propertyId", authMiddleware, buyProperty);

module.exports = router;
