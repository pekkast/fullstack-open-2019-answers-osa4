const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const User = require('../../models/user');
const passwordHelper = require('../../utils/password_helper');
const api = supertest(app);

const authUser = 'testuser';
const authPw = 'testpassword';

beforeAll(async () => {
  await User.deleteMany({})
  await User.insertMany([{
    username: authUser,
    name: 'Käyttäjä Juuri',
    passwordHash: await passwordHelper.hash(authPw),
  }]);
})

test('should be able to login', async () => {
  const login = {
    username: authUser,
    password: authPw
  };

  const response = await api
    .post('/api/auth/login')
    .send(login)
    .expect(200);
  expect(response.body.token).toBeDefined();
});

afterAll(() => {
    mongoose.connection.close();
});
