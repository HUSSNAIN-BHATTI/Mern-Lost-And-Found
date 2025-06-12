const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { submitClaim, getMyClaims } = require("../controllers/claimController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
// Optional file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, and PDF files are allowed"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
// Routes
router.post("/", authMiddleware, upload.single("proofDocument"), submitClaim);
router.get("/mine", authMiddleware, getMyClaims);
module.exports = router;
