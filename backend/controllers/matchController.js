// controllers/matchController.js

const LostItem = require('../models/lostItem');
const FoundItem = require('../models/foundItem');

/**
 * Controller to get all matches between lost and found items
 */
const getMatches = async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();

    const matches = [];

    for (const lost of lostItems) {
      for (const found of foundItems) {
        // Simple matching logic: can be enhanced with NLP, fuzzy matching, etc.
        if (
          lost.itemName.toLowerCase() === found.itemName.toLowerCase() &&
          lost.category.toLowerCase() === found.category.toLowerCase()
        ) {
          matches.push({ lostItem: lost, foundItem: found });
        }
      }
    }
    console.log("Lost Items:", lostItems.length);
    console.log("Found Items:", foundItems.length);
    console.log("Matches Found:", matches.length);

    res.status(200).json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).json({ message: 'Internal server error while matching items' });
  }
};

module.exports = {
  getMatches,
};
