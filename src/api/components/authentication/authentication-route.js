const express = require('express');
const authentification = require('./authentication-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/api/authentication', route);

  route.post('/login', authentification.login);
};
