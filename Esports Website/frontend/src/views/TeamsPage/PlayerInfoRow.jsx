import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OverlayTrigger, Popover } from 'react-bootstrap';

// generate rows for Player Information table
function PlayerInfoRow({ player }) {
  const [teamName, setTeamName] = useState('');
  const [playerImageUrl, setPlayerImageUrl] = useState('');

  useEffect(() => {
    // get team name based on player.team_id
    if (player.team_id) {
      axios
        .get(`http://localhost:8080/teams/${player.team_id}`)
        .then((response) => {
          setTeamName(response.data.name);
        })
        .catch((error) => {
          console.error('Error fetching team:', error);
          setTeamName('Unknown Team');
        });
    }

    // get player photo URL from database
    if (player.photo_url) {
      setPlayerImageUrl(player.photo_url);
    }
  }, [player.team_id, player.photo_url]);

  // update player url to /player_photos/fred_freeman.png for test purposes
  // url in update should go to path relative to public, where player profile photos may be saved

  // popover content
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>
        <img
          src={playerImageUrl}
          alt={`${player.full_name} Player Profile`}
          className='img-fluid w-50 mb-2'
        />
        <br />
        <strong>Player:</strong> {player.full_name}<br />
        <strong>Team:</strong> {teamName}<br />
        <strong>Email:</strong> {player.email}<br />
        <strong>Phone:</strong> {player.phone}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement='auto'
      overlay={popover}
      delay={{ show: 300, hide: 200 }}
    >
      <tr key={player.id}>
        <td>{player.full_name}</td>
        <td>{player.address}</td>
        <td>{player.city}</td>
        <td>{player.state}</td>
        <td>{player.zip}</td>
        <td>{teamName}</td>
        <td>{player.email}</td>
        <td>{player.phone}</td>
      </tr>
    </OverlayTrigger>
  );
}

export default PlayerInfoRow;
