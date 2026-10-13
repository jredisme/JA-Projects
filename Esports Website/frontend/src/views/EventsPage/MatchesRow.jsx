import React from 'react';

// generate rows for matches table
function MatchesRow({ match }) {
  const formattedDate = new Date(match.matchDate).toLocaleDateString();  // format as MM/DD/YYYY
  const formattedTime = match.matchTime;
  
  return (
    <tr key={match.matchId}>
      <td>{`${match.team1} vs ${match.team2}`}</td>
      <td>{match.venue}</td>
      <td>{formattedDate}</td>
      <td>{formattedTime}</td>
    </tr>
  );
}

export default MatchesRow;
