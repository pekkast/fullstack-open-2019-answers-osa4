const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const User = require('../../models/user');
const testHelper = require('../test_helper');
const api = supertest(app);
const authUser = 'root';
const authPw = 'testpassword';
let authToken;

beforeAll(async () => {
  await User.deleteMany({});
  authToken = await testHelper.getAuthToken(authUser, authPw);
});

const authApi = (request, token) => {
  token = token || authToken;
  return request.set('Authorization', 'Bearer ' + token);
};

test('should be able to create user', async () => {
  const user = {
    username: 'root2',
    name: 'Käyttäjä Juuri',
    password: 'fooobaarrfoo'
  };

  const response = await authApi(api.post('/api/users'))
    .send(user)
    .expect(201);

  const itemUrl = response.get('location');

  const userResponse = await api
    .get(itemUrl)
    .expect(200);

  expect(userResponse.body)
    .toEqual({
      id: itemUrl.split('/').pop(),
      username: user.username,
      name: user.name,
      blogs: [],
    });
});

test('should have error if too short username', async () => {
  const user = {
    username: 'ro',
    name: 'Käyttäjä Lyhyt',
    password: 'fooobaarrfoo'
  };

  const response = await authApi(api.post('/api/users'))
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(response.body.error).toContain('Käyttäjätunnu');
});

test('should have error if username not unique', async () => {
  const user = {
    username: 'root',
    name: 'Käyttäjä ei Uniikki',
    password: 'fooobaarrfoo'
  };

  const response = await authApi(api.post('/api/users'))
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(response.body.error).toContain('`username` to be unique');
});

test('should have error if too short password', async () => {
  const user = {
    username: 'rooottii',
    name: 'Käyttäjä Salis',
    password: 'fo'
  };

  const response = await authApi(api.post('/api/users'))
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(response.body.error).toContain('Salasana');
});

afterAll(() => {
    mongoose.connection.close();
});
