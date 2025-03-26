const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  books(app);
  users(app);

  return app;
};
