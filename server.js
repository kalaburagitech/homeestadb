require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
// const sellerRoutes = require("./routes/sellerRoutes");
// const buyerRoutes = require("./routes/buyerRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

// Initialize Express App
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/sellers", sellerRoutes);
// app.use("/api/buyers", buyerRoutes);
app.use("/api/properties", propertyRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🏡 Welcome to HomeEsta Real Estate API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
