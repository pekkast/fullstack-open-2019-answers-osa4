const dummy = foo => 1;

const totalLikes = blogs => blogs && blogs.length && blogs.reduce((result, item) => result + item.likes, 0);

module.exports = { dummy, totalLikes };
