const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

// get all events
router.get('/', eventController.getAllEvents);

// update an event
router.put(
  '/:eventId',
  eventController.validate('updateEvent'), // apply validation rules for updating event
  eventController.handleValidationErrors, // handle validation errors
  eventController.updateEvent // update event if valid
);

// register a team for an event
router.post('/register', eventController.registerTeamForEvent);

module.exports = router;
