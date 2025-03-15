// controllers/subscriptionController.js
const Subscription = require("../models/Subscription");
const Transaction = require("../models/Transaction");

// Create a new subscription plan (Admin only)
exports.createSubscription = async (req, res) => {
  try {
    const { plan_name, price, eligible_for } = req.body;
    if (!plan_name || !price || !eligible_for) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const subscription = new Subscription({ plan_name, price, eligible_for });
    await subscription.save();
    res.status(201).json({ message: "Subscription created successfully", subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all available subscription plans
exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ eligible_for: "buyer" });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buyer purchases a subscription plan
exports.buySubscription = async (req, res) => {
  try {
    // Ensure only a buyer can purchase a subscription
    if (!req.user || req.user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can purchase subscriptions" });
    }
    const { subscription_id } = req.body;
    const subscription = await Subscription.findById(subscription_id);
    if (!subscription) return res.status(404).json({ message: "Subscription not found" });
    
    // Record the transaction
    const transaction = new Transaction({
      buyer_id: req.user.id,
      subscription_id: subscription._id,
      purchase_price: subscription.price
    });
    await transaction.save();
    res.status(201).json({ message: "Subscription purchased successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check if a buyer has an active subscription (simple check via transaction)
exports.checkSubscription = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can check subscriptions" });
    }
    const transaction = await Transaction.findOne({ buyer_id: req.user.id });
    if (!transaction) {
      return res.status(404).json({ message: "No active subscription found" });
    }
    const subscription = await Subscription.findById(transaction.subscription_id);
    res.json({ subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
