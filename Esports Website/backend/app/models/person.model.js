const sql = require('./db');

// get all people
exports.getPersons = async (personType) => {
  // SQL query to select person details
  const query = `SELECT * FROM people WHERE person_type = ?`; // choose type
  try {
    const result = await sql.query(query, [personType]);
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Error fetching people from the database')
  }
};

// update a person
exports.updatePerson = async (personId, personData) => {
  // SQL query to update a person
  const query = `
    UPDATE people 
    SET full_name = ?, address = ?, city = ?, state = ?, zip = ?, team_id = ?, email = ?, phone = ?, 
    age = ?, height = ?, weight = ?, wins = ?, losses = ?, license_level_id = ?, person_type = ?
    WHERE id = ?
  `;
  const result = await sql.query(query, [
    personData.full_name,
    personData.address,
    personData.city,
    personData.state,
    personData.zip,
    personData.team_id,
    personData.email,
    personData.phone,
    personData.age,
    personData.height,
    personData.weight,
    personData.wins,
    personData.losses,
    personData.license_level_id,
    personData.person_type,
    personId
  ]);
  return result;
};

// update player photo URL
exports.updatePlayerUrl = async (playerId, photoUrl) => {
  //SQL query to update a person's photo url
  const query = `UPDATE people SET photo_url = ? WHERE id = ? AND person_type = 'player'`;
  const result = await sql.query(query, [photoUrl, playerId]);
  return result;
};
