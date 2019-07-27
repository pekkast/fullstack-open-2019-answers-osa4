const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const Blog = require('../../models/blog');
const api = supertest(app);

const initialBlogs = require('../setup/blogs');

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs);
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('returns correct amount of blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body.length).toBe(initialBlogs.length);
});

test('has id defined', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('should be able to create blog', async () => {
  const blog = {
    title: 'Elämän sietämätön keveys',
    author: 'Tuumaileva Tauno',
    url: 'https://sietokyky.fi',
    likes: 4,
  };

  const response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(201);

  const itemUrl = response.get('location');
  const id = itemUrl.split('/').pop();

  const blogResponse = await api
    .get(itemUrl)
    .expect(200);

  expect(blogResponse.body).toEqual({ id, ...blog });

  // Add test that was required, though redundant
  const blogsResponse = await api.get('/api/blogs');
  expect(blogsResponse.body.length).toBe(initialBlogs.length + 1);
});

test('should set empty likes to 0', async () => {
  const blog = {
    title: 'Elämän sietämätön keveys likes 0',
    author: 'Tuumaileva Tauno',
    url: 'https://sietokyky.fi',
  };

  const response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(201);

  const itemUrl = response.get('location');

  const blogResponse = await api
    .get(itemUrl)
    .expect(200);

  expect(blogResponse.body.likes).toBe(0);
});

test('should return 400 for missing title', async () => {
  const blog = {
    author: 'Tuumaileva Tauno',
    url: 'https://sietokyky.fi',
  };

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400);
});

test('should return 400 for missing url', async () => {
  const blog = {
    title: 'Elämän sietämätön keveys likes 0',
    author: 'Tuumaileva Tauno',
  };

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400);
});

test('should successfully delete blog', async () => {
  const blog = {
    title: 'Elämän sietämätön keveys delete',
    author: 'Tuumaileva Tauno',
    url: 'https://sietokyky.fi',
    likes: 5,
  };

  // Arrange - create
  const response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(201);

  const itemUrl = response.get('location');

  // Act - delete
  await api.delete(itemUrl).expect(204);

  // Assert - not found
  await api.get(itemUrl).expect(404);
});

test('should update blog likes', async () => {
  const blog = {
    title: 'Elämän sietämätön keveys delete',
    author: 'Tuumaileva Tauno',
    url: 'https://sietokyky.fi',
    likes: 5,
  };

  // Arrange - create
  const response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(201);

  const itemUrl = response.get('location');
  const likes = blog.likes + 2;

  // Act - update likes
  await api
    .patch(itemUrl)
    .send({ likes })
    .expect(204);

  // Assert
  const blogResponse = await api.get(itemUrl).expect(200);
  expect(blogResponse.body.likes).toBe(likes);
});

afterAll(() => {
  mongoose.connection.close();
});
