const dummy = foo => 1;

const totalLikes = blogs => blogs && blogs.length && blogs.reduce((result, item) => result + item.likes, 0);

const favoriteBlog = blogs => {
  if (!blogs || !blogs.length) {
    return undefined;
  }
  // Do not alter given array - slice it
  return blogs.slice().sort((a, b) => a.likes > b.likes ? -1 : 1)[0];
};

const mostBlogs = blogs => {
  if (!blogs || !blogs.length) {
    return undefined;
  }
  return blogs.reduce((result, item) => {
    // ensure that author exists
    let idx = result.findIndex(b => b.author === item.author);
    if (idx === -1) {
      result.push({ author: item.author, blogs: 1 });
    } else {
      result[idx].blogs++;
    }
    return result;
  }, []).sort((a, b) => a.blogs > b.blogs ? -1 : 1)[0];
}

const mostLikes = blogs => {
  if (!blogs || !blogs.length) {
    return undefined;
  }
  return blogs.reduce((result, item) => {
    // ensure that author exists
    let idx = result.findIndex(b => b.author === item.author);
    if (idx === -1) {
      result.push({ author: item.author, likes: item.likes });
    } else {
      result[idx].likes += item.likes;
    }
    return result;
  }, []).sort((a, b) => a.likes > b.likes ? -1 : 1)[0];
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
