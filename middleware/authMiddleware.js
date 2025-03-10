const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer '
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Middleware to check if user is a seller
exports.sellerAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "seller") {
    return res.status(403).json({ message: "Access Denied. Only sellers can perform this action." });
  }
  next();
};
