import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamRow from './TeamRow';
import PlayerInfoRow from './PlayerInfoRow';
import PlayerStatsRow from './PlayerStatsRow';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function TeamsPage() {
  const [teams, setTeams] = useState([]);  // state for storing teams data
  const [players, setPlayers] = useState([]); // state for storing player data
  const [selectedPlayer, setSelectedPlayer] = useState(''); // state for the selected player
  const [photoUrl, setPhotoUrl] = useState(''); // state for the URL input
  const [error, setError] = useState(null); // error state to handle any get errors

  // get teams data
  useEffect(() => {
    axios
      .get('http://localhost:8080/teams') 
      .then((response) => {
        setTeams(response.data);  // update state with teams data
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
        setError('Error fetching teams');
      });
  }, []);

  // get players data
  useEffect(() => {
    axios
      .get('http://localhost:8080/players')
      .then((response) => {
        setPlayers(response.data); // update state with player data
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
        setError('Error fetching players');
      });
  }, []);

  // URL submission for the selected player
  const handleUpdateUrl = () => {
    if (!selectedPlayer || !photoUrl) {
      alert('Please select a player and enter a URL');
      return;
    }

    axios
      .put(`http://localhost:8080/players/${selectedPlayer}/update-url`, { photo_url: photoUrl })
      .then(() => {
        alert('Player URL updated successfully');
        setPhotoUrl(''); // reset URL input field
      })
      .catch((error) => {
        console.error('Error updating player URL:', error);
        setError('Error updating player URL');
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container id="teams" className="mt-5">
      <Row className="mb-5">
        {/* Team Info */}
        <Col xs={12}>
          <h1>Detailed Teams and Players Information can be found here.</h1>
          <p>Learn about your favorite athletes and coaches. Check it out!</p>
          <h2>Teams</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Team</th>
                <th>Coach</th>
                <th>Phone</th>
                <th>Email</th>
                <th>League</th>
                <th>Wins</th>
                <th>Losses</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <TeamRow key={team.teamId} team={team} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mb-5">
        {/* Player URL Update */}
        <Col xs={12}>
          <h3>Update Player Photo URL</h3>
          <Form>
            <Form.Group controlId="playerSelect">
              <Form.Label>Select Player:</Form.Label>
              <Form.Control
                as="select"
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
              >
                <option value="">--Select a player--</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.full_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="photoUrl" className="mt-3">
              <Form.Label>Enter Photo URL:</Form.Label>
              <Form.Control
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" className="mt-3" onClick={handleUpdateUrl}>
              Update URL
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-5">
        {/* Player Info Table */}
        <Col xs={12}>
          <h2>Player Information</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Team</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <PlayerInfoRow key={player.id} player={player} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        {/* Player Stats Table */}
        <Col xs={12}>
          <h2>Player Statistics</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Team</th>
                <th>Wins</th>
                <th>Losses</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <PlayerStatsRow key={player.id} player={player} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default TeamsPage;
