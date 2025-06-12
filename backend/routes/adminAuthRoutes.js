const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/adminAuthController");

// Register new admin
// router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

module.exports = router;