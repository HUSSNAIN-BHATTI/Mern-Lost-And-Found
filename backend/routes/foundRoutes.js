const express = require("express");
const router = express.Router();
const {authMiddleware}  = require("../middleware/authMiddleware");
const {
  reportFoundItem,
  getMyFoundItems,
  getAllFoundItems
} = require("../controllers/foundItemController");

// Protected: Report a found item
router.post("/", authMiddleware, reportFoundItem);

// Protected: Get user's found items
router.get("/mine", authMiddleware, getMyFoundItems);

// Public/Admin: Get all found items
router.get("/", getAllFoundItems);

module.exports = router;
