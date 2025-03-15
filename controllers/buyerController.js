const Buyer = require("../models/Buyer");
const Property = require("../models/Property");
const Subscription = require("../models/Subscription");



// Get all subscription plans
exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ eligible_for: "buyer" });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buy property (checks subscription)
exports.buyProperty = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can buy properties" });
    }

    const buyer = await Buyer.findOne({ user_id: req.user.id }).populate("subscription_plan");
    if (!buyer) {
      return res.status(400).json({ message: "You must be registered as a buyer" });
    }

    if (!buyer.subscription_plan) {
      return res.status(403).json({ message: "Subscription required to buy properties" });
    }

    const property = await Property.findById(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Here, handle payment and purchase logic (e.g., save transaction details)

    res.json({ message: "Property purchased successfully", property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
