// routes/matchRoutes.js

const express = require('express');
const router = express.Router();
const { getMatches } = require('../controllers/matchController');

// Route to fetch matched lost and found items
router.get('/', getMatches);

module.exports = router;
