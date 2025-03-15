const Property = require("../models/Property");
const Transaction = require("../models/Transaction"); // Used for checking buyer's subscription

// Helper: Check if a buyer has an active subscription.
// This function looks for a Transaction record for the buyer and returns the subscription id if found.
const checkIfBuyerHasSubscription = async (buyerId) => {
  const transaction = await Transaction.findOne({ buyer_id: buyerId });
  if (transaction && transaction.expiry_date > new Date()) {
    return transaction.subscription_id.toString();
  }
  return null;
};
// Create a new property (only sellers)
exports.addProperty = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please login." });
    }
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can add properties" });
    }

    const property = new Property({
      seller_id: req.user.id, // Automatically set from the seller's token
      ...req.body, // This may include the subscription_required field if the property is premium
    });

    await property.save();
    res.status(201).json({ message: "Property added successfully", property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update property by ID (only the seller who owns the property)
exports.updateProperty = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can update properties" });
    }

    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Ensure that the seller is updating only their own property
    if (property.seller_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this property" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete property by ID
exports.deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all properties
// Get a single property by ID with subscription check for buyers
exports.getPropertyById = async (req, res) => {
  try {
    // Populate subscription_required and seller info for context
    const property = await Property.findById(req.params.id)
      .populate("subscription_required")
      .populate("seller_id", "name email");
    if (!property) return res.status(404).json({ message: "Property not found" });
    
    // If property requires a subscription and the requester is a buyer, verify subscription validity
    if (req.user && req.user.role === "buyer" && property.subscription_required) {
      const buyerSubscriptionId = await checkIfBuyerHasSubscription(req.user.id);
      if (!buyerSubscriptionId || buyerSubscriptionId !== property.subscription_required._id.toString()) {
        return res.status(403).json({ message: "Access denied. You need an active subscription (valid for 30 days) to view this property." });
      }
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all properties for buyer with access flags
exports.getProperties = async (req, res) => {
  try {
    // Retrieve all properties and populate subscription details
    const properties = await Property.find({}).populate("subscription_required");
    
    let results;
    if (req.user && req.user.role === "buyer") {
      const buyerSubscriptionId = await checkIfBuyerHasSubscription(req.user.id);
      results = properties.map(property => {
        const prop = property.toObject();
        if (prop.subscription_required) {
          if (!buyerSubscriptionId || buyerSubscriptionId !== prop.subscription_required._id.toString()) {
            prop.access = "premium"; // Buyer must purchase/renew subscription
          } else {
            prop.access = "granted"; // Buyer has an active subscription
          }
        } else {
          prop.access = "free"; // No subscription required
        }
        return prop;
      });
    } else {
      results = properties;
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
