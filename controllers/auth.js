const jwt = require('jsonwebtoken');
const authController = require('express').Router();
const passwordHelper = require('../utils/password_helper');
const User = require('../models/user');

authController.post('/login', async (request, response) => {
  const data = request.body;

  const user = await User.findOne({ username: data.username });
  const passwordCorrect = user === null
    ? false
    : await passwordHelper.validate(data.password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .json({ token, username: user.username, name: user.name });
})

module.exports = authController;
