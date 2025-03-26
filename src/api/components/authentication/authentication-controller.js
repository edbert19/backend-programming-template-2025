const usersService = require('../users/users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { passwordMatched } = require('../../../utils/password');

async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Butuh email n pw!!');
    }

    const user = await usersService.getUserByEmail(email);
    if (!user) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User not found');
    }

    const validityCheckk = await passwordMatched(password, user.password);
    if (!validityCheckk) {
      throw errorResponder(errorTypes.INVALID_PASSWORD, 'Invalid password');
    }

    return response.status(200).json({ message: 'success' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
