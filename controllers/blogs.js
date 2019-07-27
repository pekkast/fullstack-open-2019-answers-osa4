const blogsController = require('express').Router();
const Blog = require('../models/blog');

blogsController.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsController.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog === null) {
    return response.status(404).end();
  }
  response.json(blog);
});

blogsController.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

blogsController.patch('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes });
    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

blogsController.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  if (isNaN(blog.likes)) {
    blog.likes = 0;
  }

  try {
    const result = await blog.save();
    response
      .status(201)
      .header('location', request.originalUrl + '/' + result.id)
      .end();
  } catch(err) {
    next(err);
  }
});

module.exports = blogsController;
