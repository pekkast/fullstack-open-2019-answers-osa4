const dummy = foo => 1;

const totalLikes = blogs => blogs && blogs.length && blogs.reduce((result, item) => result + item.likes, 0);

const favoriteBlog = blogs => {
  if (!blogs || !blogs.length) {
    return undefined;
  }
  // Do not alter given array - slice it
  return blogs.slice().sort((a, b) => a.likes > b.likes ? -1 : 1)[0];
};

module.exports = { dummy, totalLikes, favoriteBlog };
