const sql = require('./db');

// get all teams
exports.getTeams = async () => {
  // SQL query to select team details, also join coach and league
  const query = `
    SELECT 
      teams.id AS teamId, 
      teams.name AS teamName, 
      teams.wins AS teamWins, 
      teams.losses AS teamLosses,
      people.full_name AS coachName, 
      people.phone AS coachPhone, 
      people.email AS coachEmail,
      leagues.name AS leagueName
    FROM teams
    JOIN people ON teams.coach_id = people.id
    JOIN leagues ON teams.league_id = leagues.id
  `;
  try {
    const result = await sql.query(query);
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Error fetching teams from the database')
  }
};

// get a team by their id
exports.getTeamById = async (teamId) => {
  // SQL query to select a team by id
  const query = `SELECT * FROM teams WHERE id = ?`;
  const result = await sql.query(query, [teamId]);
  return result[0];
};

// update a team
exports.update = async (teamId, teamData) => {
  // SQL query to update a team
  const query = `
    UPDATE teams 
    SET name = ?, coach_id = ?, league_id = ?, wins = ?, losses = ?
    WHERE id = ?
  `;
  const result = await sql.query(query, [
    teamData.name,
    teamData.coach_id,
    teamData.league_id,
    teamData.wins,
    teamData.losses,
    teamId
  ]);
  return result;
};
