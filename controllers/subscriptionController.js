const Subscription = require("../models/Subscription");
const Transaction = require("../models/Transaction");

// Purchase Subscription
exports.buySubscription = async (req, res) => {
  try {
    if (req.user.role !== "buyer") {
      return res.status(403).json({ message: "Only buyers can purchase subscriptions" });
    }

    const { subscription_id } = req.body;
    const subscription = await Subscription.findById(subscription_id);
    if (!subscription) return res.status(404).json({ message: "Subscription not found" });

    // Create transaction
    const transaction = new Transaction({
      buyer_id: req.user.id,
      subscription_id,
      purchase_price: subscription.price,
    });

    await transaction.save();
    res.status(201).json({ message: "Subscription purchased successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
