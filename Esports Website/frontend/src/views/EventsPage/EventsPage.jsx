import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventRow from './EventRow';
import MatchesRow from './MatchesRow';
import eventImage from '../../assets/images/event_image.png';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function EventsPage() {
  const [events, setEvents] = useState([]);  // state for storing events data
  const [matches, setMatches] = useState([]); // state for storing matches data
  const [teams, setTeams] = useState([]); // state for storing teams data
  const [selectedTeam, setSelectedTeam] = useState(''); // state for selected team
  const [selectedEvent, setSelectedEvent] = useState(''); // state for selected event
  const [error, setError] = useState(null); // error state to handle any get errors

  // get events data
  useEffect(() => {
    axios
      .get('http://localhost:8080/events')
      .then((response) => {
        setEvents(response.data); // update state with events data
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setError('Error fetching events');
      });

    // get teams data
    axios
      .get('http://localhost:8080/teams')
      .then((response) => {
        setTeams(response.data); // update state with teams data
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
        setError('Error fetching teams');
      });

    // get matches data
    axios
      .get('http://localhost:8080/matches')
      .then((response) => {
        setMatches(response.data); // update state with matches data
      })
      .catch((error) => {
        console.error('Error fetching matches:', error);
        setError('Error fetching matches');
      });
  }, []);

  // event registration for the selected team
  const handleRegisterTeam = () => {
    if (!selectedTeam || !selectedEvent) {
      alert('Please select both a team and an event');
      return;
    }

    const data = {
      teamId: selectedTeam,
      eventId: selectedEvent,
    };

    axios
      .post('http://localhost:8080/events/register', data)
      .then((response) => {
        alert('Team successfully registered');

        // update events state with the updated registered teams
        setEvents(events.map((event) => {
          if (event.eventId === selectedEvent) {
            return { 
              ...event, 
              registered_teams: response.data.registeredTeams // update the registered team names, refresh page to view
            };
          }
          return event;
        }));
      })
      .catch((error) => {
        console.error('Error registering team:', error);
        setError('Error registering team');
      });
  };

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <Container id="events" className="mt-5">
      <Row className="mb-5">
        {/* Events Info */}
        <Col xs={12}>
          <h1>Here the latest events and matchups!</h1>
          <p>Track how the season developments and enjoy the latest match schedule.</p>
          <img src={eventImage} alt="Event Header" className="img-fluid" />
        </Col>
      </Row>

      <Row>
        {/* Events Table */}
        <Col xs={12} className="mb-5">
          <h2>Events</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
                <th>Date</th>
                <th>Location</th>
                <th>Registered Teams</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <EventRow key={event.eventId} event={event} />
              ))}
            </tbody>
          </Table>
        </Col>

        <Col xs={12} className="mb-5">
        {/* Events Registration */}
          <h3>Register Team for Event</h3>
          <Form>
            <Form.Group controlId="teamSelect">
              <Form.Label>Select Team:</Form.Label>
              <Form.Control
                as="select"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="">--Select a team--</option>
                {teams.map((team) => (
                  <option key={team.teamId} value={team.teamId}>
                    {team.teamName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="eventSelect" className="mt-3">
              <Form.Label>Select Event:</Form.Label>
              <Form.Control
                as="select"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="">--Select an event--</option>
                {events.map((event) => (
                  <option key={event.eventId} value={event.eventId}>
                    {event.eventName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={handleRegisterTeam}>
              Register
            </Button>
          </Form>
        </Col>

        <Col xs={12}>
        {/* Matches Table */}
          <h2>Matches</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Match</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <MatchesRow key={match.matchId} match={match} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default EventsPage;
