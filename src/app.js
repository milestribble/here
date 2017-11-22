const express = require('express');
const bodyParser = require('body-parser');
const { createJourney, updateJourney, getJourney, expireJourneys } = require('../db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const generateAPin = () => {
  const pin = Math.floor(Math.random() * 10000);
  return pin < 1000 ? generateAPin() : pin;
};

const getExpirationHour = () => {
  const hour = new Date().getHours() > 11
    ? new Date().getHours() - 12
    : new Date().getHours();
  return hour;
};

setInterval(() => { expireJourneys(new Date().getHours()); }, 1000 * 60 * 60);

app.post('/journey', (req, res) => {
  const pin = generateAPin();
  const expiration = getExpirationHour();
  createJourney(pin, req.body.name, expiration, req.body.eta, 'PENDING')
    .then(result => res.send(result));
});

app.put('/journey/:pin', (req, res) =>
  updateJourney(Number(req.params.pin), req.body.eta)
    .then(result => res.send(result)));


app.get('/journey/:pin', (req, res) =>
  getJourney(Number(req.params.pin))
    .then(result => res.send(result)));

app.listen(8082);
