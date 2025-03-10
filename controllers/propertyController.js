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
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("seller_id", "name email");
    res.json(properties);
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
