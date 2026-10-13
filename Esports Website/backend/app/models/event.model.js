const sql = require('./db');

// get all events
exports.getEvents = async () => {
  // SQL query to select event details
  const query = `                                   
    SELECT 
      events.id AS eventId, 
      events.event_name AS eventName, 
      events.event_description AS eventDescription, 
      events.event_date AS eventDate,
      events.event_location AS eventLocation,
      events.registered_teams AS registeredTeams
    FROM events
  `;
  try {
    const result = await sql.query(query);
    // process result by split registered_teams into an array and adding them
    for (let event of result) {
      if (event.registeredTeams && event.registeredTeams.length > 0) {
        const teamNames = event.registeredTeams.split(','); // convert to array
        event.registeredTeams = teamNames;  // set teams as an array
      } else {
        event.registeredTeams = [];
      }
    }
    return result;  // return event data complete with registered_teams
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Error fetching events from the database');
  }
};

// get an event by ID
exports.getEventById = async (eventId) => {
   // SQL query to select event by id
  const query = 'SELECT * FROM events WHERE id = ?';
  const result = await sql.query(query, [eventId]);
  return result[0];
};

// retrieve team name by ID
exports.getTeamById = async (teamId) => {
   // SQL query to select team details for event registration
  const query = 'SELECT name FROM teams WHERE id = ?';
  const result = await sql.query(query, [teamId]);
  return result[0]; // return team name
};

// update the registered teams for an event
exports.updateRegisteredTeams = async (eventId, registeredTeams) => {
   // SQL query to update events
  const query = `
    UPDATE events 
    SET registered_teams = ? 
    WHERE id = ?
  `;
  const result = await sql.query(query, [registeredTeams, eventId]);
  return result;
};
