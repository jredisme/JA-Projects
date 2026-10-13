const sql = require('./db');

// get all matches
exports.getMatches = async () => {
    // SQL query to select match details
    const query = `
    SELECT 
      matches.id AS matchId, 
      t1.name AS team1,
      t2.name AS team2,
      matches.venue,
      matches.match_date AS matchDate,
      matches.match_time AS matchTime
    FROM matches
    JOIN teams AS t1 ON matches.team1_id = t1.id
    JOIN teams AS t2 ON matches.team2_id = t2.id
  `;
    try {
      const result = await sql.query(query);
      return result;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Error fetching matches from the database')
    }
};

// update a match
exports.updateMatch = async (matchId, matchData) => {
  // SQL query to update a match
  const query = `
    UPDATE matches
    SET team1_id = ?, team2_id = ?, venue = ?, match_date = ?, match_time = ?
    WHERE id = ?
  `;
  const result = await sql.query(query, [
    matchData.team1_id,
    matchData.team2_id,
    matchData.venue,
    matchData.match_date,
    matchData.match_time,
    matchId,
  ]);
  return result;
};
