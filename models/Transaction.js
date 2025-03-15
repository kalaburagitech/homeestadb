const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subscription_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", required: true },
  purchase_price: { type: Number, required: true },
  purchase_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
