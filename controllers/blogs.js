const blogsController = require('express').Router();
const Blog = require('../models/blog');

blogsController.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogsController.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
});

module.exports = blogsController;
