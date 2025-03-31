const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");

/**
 * @swagger
 * /api/sellers:
 *   post:
 *     description: Add a new seller
 *     parameters:
 *       - name: seller
 *         in: body
 *         description: Seller object to add
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             contact:
 *               type: string
 *     responses:
 *       201:
 *         description: Seller added successfully
 *       400:
 *         description: Invalid input
 */
router.post("/sellers", sellerController.addSeller);

/**
 * @swagger
 * /api/sellers:
 *   get:
 *     description: Get all sellers
 *     responses:
 *       200:
 *         description: List of sellers
 */
router.get("/sellers", sellerController.getSellers);

module.exports = router;
