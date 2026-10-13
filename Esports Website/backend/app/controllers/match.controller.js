const Match = require('../models/match.model');
const { body, validationResult } = require('express-validator');

// get and return all matches from the database
exports.getAllMatches = async (_, res) => {
  try {
    // perform the query asynchronously
    const matches = await Match.getMatches(); // call getMatches from match.model.js
    // send match data in a JSON response with a 200 (success) status
    res.status(200).json(matches);
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ error: err.message });
  }
};

// update a match
exports.updateMatch = async (req, res) => {
  try {
    // perform update asynchronously
    const updatedMatch = await Match.update(req.params.matchId, req.body); // call update from match.model.js
    // send a 404 error if it fails
    if (!updatedMatch) {
      return res.status(404).json({ message: 'Match not found' });
    }
    // send updated match data in a JSON response with a 200 (success) status
    res.status(200).json(updatedMatch);
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ error: err.message });
  }
};

// validation rules
exports.validate = (method) => {
  const rules = [
    body('team1_id')
      .isInt().withMessage('team1_id must be an integer').notEmpty(),
    body('team2_id')
      .isInt().withMessage('team2_id must be an integer').notEmpty(),
    body('venue')
      .not().isEmpty().trim().escape().withMessage('Venue is required'),
    body('match_date')
      .not().isEmpty().trim().escape().withMessage('Match date is required'),
    body('match_time')
      .not().isEmpty().trim().escape().withMessage('Match time is required'),
  ];

  switch (method) {
    case 'createMatch':
      return rules;
    case 'updateMatch':
      return rules;
    default:
      return [];
  }
};

// middleware for validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
