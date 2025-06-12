const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const LostItem = require("../models/lostItem");

// Get all lost items
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lost items" });
  }
});

// Delete lost item (optional)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await LostItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Lost item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete lost item" });
  }
});

module.exports = router;