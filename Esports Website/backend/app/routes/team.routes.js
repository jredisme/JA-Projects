const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');

// get all teams
router.get('/', teamController.getAllTeams);

// get a team by their id
router.get('/:teamId', teamController.getTeamById);

// update a team
router.put(
  '/:teamId',
  teamController.validate('updateTeam'), // apply validation rules for updating team
  teamController.handleValidationErrors, // handle validation errors
  teamController.update // update team if valid
);

module.exports = router;
