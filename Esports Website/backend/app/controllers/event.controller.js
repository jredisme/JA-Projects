const Event = require('../models/event.model');
const { body, validationResult } = require('express-validator');

// get and return all events from database
exports.getAllEvents = async (_, res) => { 
  try {
    // perform the query asynchronously
    const events = await Event.getEvents(); // call getEvents from event.model.js
    // send event data in a JSON response with a 200 (success) status
    res.status(200).json(events);
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ error: err.message });
  }
};


// update an event
exports.updateEvent = async (req, res) => {
  try {
    // perform update asynchronously
    const updatedEvent = await Event.update(req.params.eventId, req.body); // call update from event.model.js
    // send a 404 error if it fails
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' }); 
    }
    // send updated event data in a JSON response with a 200 (success) status
    res.status(200).json(updatedEvent);
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ error: err.message });
  }
};

// validation rules
exports.validate = (method) => {
  const rules = [
    body('event_name')
      .not().isEmpty().trim().escape().withMessage('Event name is required')
      .custom(async (value) => {
        if (method === 'createEvent') {
          const exists = await Event.checkDuplicateName(value);
          if (exists) {
            throw new Error('Event name already exists');
          }
        }
        return true;
      }),
    body('event_description')
      .not().isEmpty().trim().escape().withMessage('Event description is required'),
    body('event_date')
      .not().isEmpty().trim().escape().withMessage('Event date is required'),
    body('event_location')
      .not().isEmpty().trim().escape().withMessage('Event location is required'),
  ];

  switch (method) {
    case 'createEvent':
      return rules;
    case 'updateEvent':
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

// register a team for an event
exports.registerTeamForEvent = async (req, res) => {
  const { eventId, teamId } = req.body;

  // validate user input
  if (!eventId || !teamId) {
    return res.status(400).json({ error: "Event ID and Team ID are required" });
  }

  try {
    // get event from the database
    const event = await Event.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // get registered_teams as a comma-separated string
    let registeredTeams = event.registered_teams || '';
    
    // get the team name based on the teamId
    const team = await Event.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // check if team is already registered
    if (registeredTeams.split(',').includes(team.name)) {
      return res.status(400).json({ error: "Team is already registered for this event" });
    }

    // store team name
    const teamName = team.name;

    // add team name to the registered_teams string
    registeredTeams = registeredTeams ? `${registeredTeams},${teamName}` : teamName;

    // update event's registered_teams field in the database
    await Event.updateRegisteredTeams(eventId, registeredTeams);

    // send updated event data in a JSON response with a 200 (success) status
    res.status(200).json({
      message: "Team successfully registered",
      registeredTeams: registeredTeams.split(',') // send back the list of team names
    });
  } catch (error) {
    console.error("Error registering team:", error);
    res.status(500).json({ error: "Error registering team" });
  }
};

