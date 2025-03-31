require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

// Initialize Express App
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Documentation Setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "HomeEsta Real Estate API",
      version: "1.0.0",
      description: "API documentation for HomeEsta Real Estate platform",
    },
    basePath: "/api", // This will be the base path for your API routes
  },
  apis: ["./routes/*.js"], // Pointing to the location of your route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🏡 Welcome to HomeEsta Real Estate API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
