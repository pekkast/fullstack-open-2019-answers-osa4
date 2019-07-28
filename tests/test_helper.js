const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/user');
const passwordHelper = require('../utils/password_helper');
const api = supertest(app);

const getAuthToken = async (username, password) => {
    try {
        await User.insertMany([{
            username,
            name: 'Testikäyttäjä Foo',
            passwordHash: await passwordHelper.hash(password),
        }]);
    } catch(err) {
        // User already in database
    }


    const response = await api
        .post('/api/auth/login')
        .send({ username, password })
        .expect(200);

    return response.body.token;
};

const getTokenUserId = token => {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return decodedToken && decodedToken.id;
};

module.exports = { getAuthToken, getTokenUserId };
