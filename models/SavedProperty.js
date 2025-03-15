// models/BuyerSavedProperty.js
const BuyerSavedPropertySchema = new mongoose.Schema({
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    saved_at: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model("BuyerSavedProperty", BuyerSavedPropertySchema);