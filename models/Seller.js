// models/Seller.js
const mongoose = require("mongoose");
const SellerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company_name: { type: String, required: true },
  website: { type: String }
});
module.exports = mongoose.model("Seller", SellerSchema);