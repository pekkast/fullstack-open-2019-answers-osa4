const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const authController = require('./controllers/auth');
const blogsController = require('./controllers/blogs');
const usersController = require('./controllers/users');
const errorHandler = require('./middleware/error_handler');
const tokenHandler = require('./middleware/token_handler');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(cors());
app.use(tokenHandler);
app.use(bodyParser.json());
app.use('/api/blogs', blogsController);
app.use('/api/users', usersController);
app.use('/api/auth', authController);
app.use(errorHandler);

module.exports = app;
