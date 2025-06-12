// const express = require('express');
// const router = express.Router();
// const LostItem = require('../models/lostItem');
// const FoundItem = require('../models/foundItem');
// const { verifyAdmin } = require('../middleware/authMiddleware');

// // Route: GET /api/admin/dashboard
// router.get('/dashboard', verifyAdmin, async (req, res) => {
//   try {
//     const lostItems = await LostItem.find();
//     const foundItems = await FoundItem.find();
//     res.status(200).json({ lostItems, foundItems });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch dashboard data.' });
//   }
// });

// module.exports = router;