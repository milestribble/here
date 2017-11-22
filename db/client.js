const pgp = require('pg-promise')();

const config = {
  database: process.env.NODE_ENV === 'test'
    ? 'here_journeys_test'
    : 'here_journeys',
  host: 'localhost',
  port: 5432,
};

const db = pgp(config);

module.exports = {
  db,
  query: db.query,
};
