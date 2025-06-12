const ClaimRequest = require("../models/claimRequest");
const Notification = require("../models/notification");
const LostItem = require("../models/lostItem");
const FoundItem = require("../models/foundItem");

// ✅ Submit claim with document (proof)
exports.submitClaim = async (req, res) => {
  try {
    const { lostItem, foundItem } = req.body;
    const document = req.file?.filename; // only save the filename

    if (!lostItem || !foundItem || !document) {
      return res.status(400).json({ message: "All fields including document are required." });
    }

    const claim = await ClaimRequest.create({
      user: req.user,
      lostItem,
      foundItem,
      document,
    });

    res.status(201).json({ message: "Claim submitted successfully", claim });
  } catch (err) {
    console.error("Error submitting claim:", err);
    res.status(500).json({ message: "Failed to submit claim", error: err.message });
  }
};

// ✅ Get all claims (admin use)
exports.getAllClaims = async (req, res) => {
  try {
    const claims = await ClaimRequest.find()
      .populate("user", "name email")
      .populate("lostItem")
      .populate("foundItem")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve claims", error: err.message });
  }
};

// ✅ Get my claims
exports.getMyClaims = async (req, res) => {
  try {
    const claims = await ClaimRequest.find({ user: req.user })
      .populate("lostItem foundItem")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch claims", error: err.message });
  }
};

// ✅ Update claim status (admin)
exports.updateClaimStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log("Received status:", status);

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const claim = await ClaimRequest.findById(id)
      .populate("lostItem", "itemName")
      .populate("user", "name email");
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    claim.status = status;
    await claim.save();

    if (status.toLowerCase() === "approved") {
      await LostItem.findByIdAndUpdate(claim.lostItem._id, { status: "claimed" });
      await FoundItem.findByIdAndUpdate(claim.foundItem, { status: "claimed" });
      console.log("Creating notification for user:", claim.user._id);
      await Notification.create({
        user: claim.user._id,
        message: `Your claim for "${claim.lostItem.itemName}" has been approved!`
      });
      console.log("Notification created!");
    }

    res.json({ message: "Claim status updated", claim });
  } catch (err) {
    console.error("Failed to update status", err);
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};