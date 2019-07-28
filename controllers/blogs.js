const blogsController = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsController.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
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
  const data = request.body;
  // Get creating user
  const user = (await User.find({}))[0];

  const blog = new Blog({
    title: data.title,
    url: data.url,
    author: data.author,
    likes: isNaN(data.likes) ? 0 : data.likes,
    user: user._id,
  });

  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response
      .status(201)
      .header('location', request.originalUrl + '/' + result._id)
      .end();
  } catch(err) {
    next(err);
  }
});

module.exports = blogsController;
