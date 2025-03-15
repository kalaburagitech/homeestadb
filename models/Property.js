const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true, default: "USD" },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  year_built: { type: Number, required: true },
  floor_number: { type: Number },
  property_status: { type: String, enum: ["For Sale", "For Rent"], required: true },
  features: [{ type: String }],
  size: {
    area: { type: Number, required: true },
    unit: { type: String, required: true, default: "sqft" },
  },
  images: [
    {
      image_url: { type: String, required: true },
      alt_text: { type: String },
    },
  ],
  subscription_required: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", default: null },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Property", PropertySchema);
