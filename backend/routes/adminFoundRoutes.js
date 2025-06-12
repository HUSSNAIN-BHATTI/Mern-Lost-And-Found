const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const FoundItem = require("../models/foundItem");

// Get all found items
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const items = await FoundItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch found items" });
  }
});

// Delete found item (optional)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await FoundItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Found item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete found item" });
  }
});

module.exports = router;