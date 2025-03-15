// models/Offer.js
const OfferSchema = new mongoose.Schema({
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    offer_amount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    offer_date: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model("Offer", OfferSchema);