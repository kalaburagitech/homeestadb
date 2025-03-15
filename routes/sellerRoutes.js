// routes/sellerRoutes.js
const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
router.post("/sellers", sellerController.addSeller);
router.get("/sellers", sellerController.getSellers);
module.exports = router