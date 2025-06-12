const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const { getAllClaims, updateClaimStatus } = require("../controllers/claimController");

// Admin routes
router.get("/", verifyAdmin, getAllClaims);
router.put("/:id", verifyAdmin, updateClaimStatus);

module.exports = router;
