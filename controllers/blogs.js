const blogsController = require('express').Router();
const Blog = require('../models/blog');

blogsController.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogsController.get('/:id', (request, response) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      response.json(blog);
    });
});

blogsController.post('/', (request, response, next) => {
  const blog = new Blog(request.body);
  if (isNaN(blog.likes)) {
    blog.likes = 0;
  }

  blog
    .save()
    .then(result => {
      response
        .status(201)
        .header('location', request.originalUrl + '/' + result.id)
        .end();
    })
    .catch(err => next(err));
});

module.exports = blogsController;
