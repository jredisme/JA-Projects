// player.routes.js
const express = require('express');
const router = express.Router();
const personController = require('../controllers/person.controller');

// get all players
router.get('/', (req, res) => {
  const reqWithParams = { 
    ...req, 
    params: { person_type: 'player' }
  };
  personController.getAllPeople(reqWithParams, res);
});

// update a player
router.put(
  '/:id',
  personController.validate('updatePerson'), // apply validation rules for updating player
  personController.handleValidationErrors, // handle validation errors
  personController.updatePerson // update player if valid
);

// update photo URL 
router.put(
  '/:id/update-url', 
  personController.updatePlayerUrl
);

module.exports = router;
