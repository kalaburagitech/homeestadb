const Property = require("../models/Property");

// Create a new property
exports.addProperty = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. Please login." });
      }
      if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Only sellers can add properties" });
      }
  
      const property = new Property({
        seller_id: req.user.id, // Store seller's ID from token
        ...req.body,
      });
  
      await property.save();
      res.status(201).json({ message: "Property added successfully", property });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update Property (Only Seller)
  exports.updateProperty = async (req, res) => {
    try {
      if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Only sellers can update properties" });
      }
  
      const property = await Property.findById(req.params.id);
      if (!property) return res.status(404).json({ message: "Property not found" });
  
      // Ensure the seller is updating only their property
      if (property.seller_id.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to update this property" });
      }
  
      const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ message: "Property updated successfully", property: updatedProperty });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Get all properties
exports.getPropertyForBuyer = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("subscription_required");
    if (!property) return res.status(404).json({ message: "Property not found" });
    
    // If property requires a subscription, check buyer's subscription
    if (property.subscription_required) {
      const buyerSubscriptionId = await checkIfBuyerHasSubscription(req.user.id);
      if (!buyerSubscriptionId || buyerSubscriptionId !== property.subscription_required._id.toString()) {
        return res.status(403).json({ message: "Access denied. You need the required subscription to view this property." });
      }
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("seller_id", "name email");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update property by ID
// exports.updateProperty = async (req, res) => {
//   try {
//     const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedProperty) return res.status(404).json({ message: "Property not found" });
//     res.json({ message: "Property updated successfully", property: updatedProperty });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
