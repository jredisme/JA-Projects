import React from 'react';

// generate rows for events table
function EventRow({ event }) {
  return (
    <tr key={event.eventId}>
      <td>{event.eventName}</td>
      <td>{event.eventDescription}</td>
      <td>{new Date(event.eventDate).toLocaleDateString()}</td>
      <td>{event.eventLocation}</td>
      <td>{event.registeredTeams ? JSON.stringify(event.registeredTeams) : 'No teams registered'}</td>
    </tr>
  );
}

export default EventRow;
