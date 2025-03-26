const express = require('express');
const usersService = require('../users/users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { passwordMatched } = require('../../../utils/password');

const routes = express.Router();

module.exports = (app) => {
  app.use('/authentication', routes);

  routes.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          'Email and password are required'
        );
      }

      const users = await usersService.getUserByEmail(email);

      if (!user) {
        throw errorResponder(errorTypes.UNAUTHORIZED, 'INVALID_PASSWORD');
      }

      const isPasswordValid = await passwordMatched(password, user.password);

      if (!isPasswordValid) {
        throw errorResponder(errorTypes.UNAUTHORIZED, 'INVALID_PASSWORD');
      }

      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      return next(error);
    }
  });
};
