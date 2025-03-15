const Transaction = require("../models/Transaction");

module.exports = async (req, res, next) => {
  try {
    if (req.user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can view this resource" });
    }

    const transaction = await Transaction.findOne({ buyer_id: req.user.id });
    if (!transaction) {
      return res.status(403).json({ message: "You need a subscription to access premium properties" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
