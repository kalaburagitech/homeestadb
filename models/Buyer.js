const mongoose = require("mongoose");

const BuyerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subscription_plan: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", default: null },
});

module.exports = mongoose.model("Buyer", BuyerSchema);
