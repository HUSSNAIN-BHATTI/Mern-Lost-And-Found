const FoundItem = require("../models/foundItem");

// @desc Report a found item
exports.reportFoundItem = async (req, res) => {
  const { itemName, category, description, foundLocation, dateFound, contactInfo } = req.body;

  if (!itemName || !category || !foundLocation || !dateFound || !contactInfo) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    const newFoundItem = await FoundItem.create({
      user: req.user,
      itemName,
      category,
      description,
      foundLocation,
      dateFound,
      contactInfo
    });

    res.status(201).json({ message: "Found item reported successfully", item: newFoundItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to report found item", error: err.message });
  }
};


// @desc Get found items by user
exports.getMyFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch found items", error: err.message });
  }
};

// @desc Get all found items
exports.getAllFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch found items", error: err.message });
  }
};
