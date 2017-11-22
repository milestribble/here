const express = require('express')
const bodyParser = require('body-parser');
const { createJourney, updateJourney, trackJourney, expireJourneys } = require('../db')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const generateAPin = () =>
  Math.floor(Math.random() * 10000);

const getExpirationHour = () => {
  return new Date().getHours() > 11
    ? new Date().getHours() - 12
    : new Date().getHours();
};

setInterval(() => { expireJourneys(new Date().getHours()); }, 1000 * 60 * 60)

app.post('/makeAJourney', (req, res) => {
  //RECIEVES NAME AND ETA
  const pin = generateAPin()
  const expiration = getExpirationHour()
  createJourney(pin, req.body.name, expiration, req.body.eta, 'PENDING');
  //RETURNS A PIN NUMBER
});

app.put('/makeAJourney/:pin', (req, res) => {
  //RECIEVES NAME, ETA, STATUS based on PIN
  updateJourney(req.body.pin, req.body.name, req.body.eta);
  //RETURNS NAME, ETA, STATUS, PIN
});

app.get('/trackAJourney/:pin', (req, res) => {
  //BASED ON PIN
  trackJourney(req.body.pin)
  //RETURNS NAME, ETA, STATUS, PIN
});
