const LostItem = require("../models/lostItem");

// @desc Report a lost item
exports.reportLostItem = async (req, res) => {
  const { itemName, category, description, lastSeenLocation, dateLost, contactInfo } = req.body;

  if (!itemName || !category || !lastSeenLocation || !dateLost || !contactInfo) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    const newLostItem = await LostItem.create({
      user: req.user,
      itemName,
      category,
      description,
      lastSeenLocation,
      dateLost,
      contactInfo
    });

    res.status(201).json({ message: "Lost item reported successfully", item: newLostItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to report item", error: err.message });
  }
};


// @desc Get lost items reported by current user
exports.getMyLostItems = async (req, res) => {
  try {
    const items = await LostItem.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lost items", error: err.message });
  }
};

// @desc Get all lost items (public or admin view)
exports.getAllLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lost items", error: err.message });
  }
};
