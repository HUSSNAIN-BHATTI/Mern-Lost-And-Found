const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {
  reportLostItem,
  getMyLostItems,
  getAllLostItems
} = require("../controllers/lostItemController");

// Protected: Report a lost item
router.post("/", authMiddleware, reportLostItem);

// Protected: Get user's lost items
router.get("/mine", authMiddleware, getMyLostItems);

// Public/Admin: Get all lost items
router.get("/", getAllLostItems);

module.exports = router;
