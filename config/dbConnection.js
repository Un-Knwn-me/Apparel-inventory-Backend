const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL server:', err.stack);
    return;
  }
  console.log('Connected to the MySQL server as ID', connection.threadId);

  // Create the database if it doesn't exist
  const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${mysql.escapeId(process.env.DB_NAME)}`;
  connection.query(createDbQuery, (err, results) => {
    if (err) {
      console.error('Error creating database:', err.stack);
      return;
    }
    console.log('Database created or already exists.');

    // Now connect to the newly created database
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) {
        console.error('Error changing to the new database:', err.stack);
        return;
      }
      console.log('Connected to the database:', process.env.DB_NAME);
    });
  });
});

module.exports = connection;