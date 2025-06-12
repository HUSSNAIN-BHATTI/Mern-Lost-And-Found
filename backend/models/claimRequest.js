const mongoose = require("mongoose");

const claimRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lostItem: { type: mongoose.Schema.Types.ObjectId, ref: "LostItem", required: true },
  foundItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoundItem", required: true },
  document: { type: String, required: true }, // file path
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, {
  timestamps: true
});

module.exports = mongoose.model("ClaimRequest", claimRequestSchema);
