const { query } = require('./client.js');

const createJourney = (pin, name, eta, status, expiration) =>
  query(`INSERT INTO
          JOURNEY
        (PIN, NAME, EXPIRATION, ETA, STATUS)
          VALUES
        ($1, $2, $3, $4, $5)
          RETURNING PIN`,
    [pin, name, eta, status, expiration]);

const updateJourney = (pin, name, eta) =>
  query(`UPDATE JOURNEY
          SET
        ETA = $2,
        NAME = $3
          WHERE
        PIN = $1
          RETURNING
        *`,
    [pin, eta, name]);

const getJourney = pin =>
  query(`SELECT * FROM
          JOURNEY
        WHERE
          PIN = $1`,
    [pin]);

const expireJourneys = hour =>
  query(`UPDATE JOURNEY
          SET
        STATUS = 'EXPIRED'
          WHERE
        HOUR = $1`,
    [hour]);

module.exports = {
  createJourney,
  updateJourney,
  getJourney,
  expireJourneys,
};
