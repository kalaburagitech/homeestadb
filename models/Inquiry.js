// models/Inquiry.js
const InquirySchema = new mongoose.Schema({
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    message: { type: String, required: true },
    inquiry_date: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model("Inquiry", InquirySchema);