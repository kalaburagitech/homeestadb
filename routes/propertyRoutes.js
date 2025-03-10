const express = require("express");
const { addProperty, getProperties, getPropertyById, updateProperty, deleteProperty } = require("../controllers/propertyController");
const router = express.Router();
const { authMiddleware, sellerAuth } = require("../middleware/authMiddleware");

// Routes
router.post("/", authMiddleware, sellerAuth, addProperty);
router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;
