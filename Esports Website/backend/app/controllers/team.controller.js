const Team = require('../models/team.model');
const { body, validationResult } = require('express-validator');

// get and return all teams from database
exports.getAllTeams = async (_, res) => {
  try {
    // perform the query asynchronously
    const teams = await Team.getTeams(); // call getTeams from team.model.js
    // send event data in a JSON response with a 200 (success) status
    res.status(200).json(teams);
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ error: err.message });
  }
};

// get a team by their id
exports.getTeamById = async (req, res) => {
  try {
    // perform the query asynchronously
    const team = await Team.getTeamById(req.params.teamId); // call getTeamById from team.model.js
    // send a 404 error if it fails
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    //  send team by id data in a JSOn response with a 200 (success) status
    res.status(200).json(team);
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ error: err.message });
  }
};

// update a team
exports.update = async (req, res) => {
  try {
    // perform the update asynchronously
    const updatedTeam = await Team.update(req.params.teamId, req.body);
    // send a 404 error if it fails
    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    // send updated team data in a JSON response with a 200 (success) status
    res.status(200).json(updatedTeam);
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ error: err.message });
  }
};

// validation rules
exports.validate = (method) => {
  const rules = [
    body('name')
      .not().isEmpty().trim().escape().withMessage('Team name is required')
      .custom(async (value) => {
        if (method === 'createTeam') {
          const exists = await Team.checkDuplicateName(value);
          if (exists) {
            throw new Error('Team name already exists');
          }
        }
        return true;
      }),
    body('coach_id')
      .isInt().withMessage('Coach ID must be an integer').not().isEmpty(),
    body('league_id')
      .isInt().withMessage('League ID must be an integer').not().isEmpty(),
    body('wins')
      .isInt({ min: 0 }).withMessage('Wins must be a non-negative integer'),
    body('losses')
      .isInt({ min: 0 }).withMessage('Losses must be a non-negative integer'),
  ];

  switch (method) {
    case 'createTeam':
      return rules;
    case 'updateTeam':
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
