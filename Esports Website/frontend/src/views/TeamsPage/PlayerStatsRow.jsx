import React, { useState, useEffect } from 'react';
import axios from 'axios';

// generate rows for Player Stats table
function PlayerStatsRow({ player }) {
  const [teamName, setTeamName] = useState('');

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
  }, [player.team_id]); // get team when player.team_id changes

  return (
    <tr key={player.id}>
      <td>{player.full_name}</td>
      <td>{player.age}</td>
      <td>{player.height}</td>
      <td>{player.weight}</td>
      <td>{teamName}</td>
      <td>{player.wins}</td>
      <td>{player.losses}</td>
    </tr>
  );
}

export default PlayerStatsRow;
