const { query } = require('./client.js');

const createJourney = (pin, name, expiration, eta, status) =>
  query(`INSERT INTO
          JOURNEY
        (PIN, NAME, EXPIRATION, ETA, STATUS)
          VALUES
        ($1, $2, $3, $4, $5),
          RETURNING (PIN)`,
    [pin, name, expiration, eta, status]);

const updateJourney = (pin, name, expiration, eta, status) =>
  query(`UPDATE JOURNEY
          SET
        (NAME = $2, EXPIRATION = $3, ETA = $4, STATUS = $5)
          WHERE
        PIN = $1`,
    [pin, name, expiration, eta, status]);

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
