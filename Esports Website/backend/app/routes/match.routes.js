const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

// get all matches
router.get('/', matchController.getAllMatches);

// update a match
router.put(
  '/:matchId',
  matchController.validate('updateMatch'), // apply validation rules for updating match
  matchController.handleValidationErrors, // handle validation errors
  matchController.updateMatch // update match if valid
);

module.exports = router;
