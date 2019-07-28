const jwt = require('jsonwebtoken');

const tokenHandler = (request, response, next) => {
  // Only requests other than GET require authentication
  if (request.method.toLowerCase() === 'get') {
    return next();
  }

  // Allow anonymous login & signup etc
  if (request.path.startsWith('/api/auth')) {
    return next();
  }

  // Enable updating likes without authentication
  if (request.method.toLowerCase() === 'patch' && request.path.startsWith('/api/blogs')) {
    return next();
  }

  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET);
    if (decodedToken && decodedToken.id) {
      request.token = decodedToken;
      return next();
    }
  }

  return response.status(401).json({ error: 'token missing or invalid' });
};

module.exports = tokenHandler;
