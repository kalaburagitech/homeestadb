const express = require("express");
const { addProperty, getProperties, getPropertyById, updateProperty, deleteProperty } = require("../controllers/propertyController");
const router = express.Router();
const { authMiddleware, sellerAuth } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/properties:
 *   post:
 *     description: Add a new property (Seller only)
 *     parameters:
 *       - name: property
 *         in: body
 *         description: Property object to add
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *               format: float
 *     responses:
 *       201:
 *         description: Property added successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid property data
 */
router.post("/", authMiddleware, sellerAuth, addProperty);

/**
 * @swagger
 * /api/properties:
 *   get:
 *     description: Get all properties
 *     responses:
 *       200:
 *         description: List of properties
 */
router.get("/", getProperties);

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     description: Get a specific property by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Property ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A specific property
 *       404:
 *         description: Property not found
 */
router.get("/:id", getPropertyById);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     description: Update a property (Seller only)
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Property ID to update
 *         required: true
 *         type: string
 *       - name: property
 *         in: body
 *         description: Property object to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *               format: float
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       404:
 *         description: Property not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authMiddleware, updateProperty);

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     description: Delete a property (Seller only)
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Property ID to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *       404:
 *         description: Property not found
 */
router.delete("/:id", deleteProperty);

module.exports = router;
