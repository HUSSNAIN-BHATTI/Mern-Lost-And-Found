const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true }, // Added category
  description: { type: String },
  foundLocation: { type: String, required: true },
  dateFound: { type: Date, required: true },
  contactInfo: { type: String, required: true },
  status: { type: String, enum: ["open", "claimed", "resolved"], default: "open" },
}, {
  timestamps: true,
});

module.exports = mongoose.model("FoundItem", foundItemSchema);
