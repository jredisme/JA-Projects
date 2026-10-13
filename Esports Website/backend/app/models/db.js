const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

const config = {
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
};

// create the pool
const pool = mysql.createPool(config);

// get a promise-wrapped version of that pool
const promisePool = pool.promise();

// test database connection with fail or success messages
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Successfully connected to the database.');
  connection.release();
});

// simplify query function while working with mysql2
const db = {
  query: async (sql, params) => {
    try {
      const [result] = await promisePool.query(sql, params);
      return result;
    } catch (error) {
      console.error('Error executing query:', error.message);
      throw error; // re-throw error at higher levels
    }
  }
};

module.exports = db;
