const usersController = require('express').Router();
const passwordHelper = require('../utils/password_helper');
const User = require('../models/user');

usersController.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 });
  response.json(users);
});

usersController.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user === null) {
    return response.status(404).end();
  }
  response.json(user);
});

usersController.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!username || username.length < 3) {
    return response.status(400)
      .json({ error: 'Käyttäjätunnuksen minimipituus 3 merkkiä' });
  }

  if (!password || password.length < 3) {
    return response.status(400)
      .json({ error: 'Salasanan minimipituus 3 merkkiä' });
  }

  try {
    const user = await new User({
        username,
        passwordHash: await passwordHelper.hash(password),
        name,
    }).save();

    response
      .status(201)
      .header('location', request.originalUrl + '/' + user.id)
      .end();

  } catch(err) {
    next(err);
  }
});

module.exports = usersController;
