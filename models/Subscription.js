const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  plan_name: { type: String, required: true },
  price: { type: Number, required: true },
  eligible_for: { type: String, enum: ["seller", "buyer"], required: true },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
