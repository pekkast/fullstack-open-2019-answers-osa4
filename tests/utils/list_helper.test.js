const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../../utils/list_helper');

const fakeBlogs = [{
  title: 'foo1',
  author: 'bar1',
  url: 'https://foo1.bar',
  likes: 3
}, {
  title: 'foo2',
  author: 'bar2',
  url: 'https://foo2.bar',
  likes: 7

}, {
  title: 'foo3',
  author: 'bar1',
  url: 'https://foo3.bar',
  likes: 2
}, {
  title: 'foo4',
  author: 'bar4',
  url: 'https://foo4.bar',
  likes: 2
}];

describe('dummy util', () => {
  test('should return 1', () => {
    expect(dummy('whatever')).toBe(1);
  });
});

describe('total likes', () => {
  test('should return 0 when no blogs exist', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('should return likes count of a single blog', () => {
    const likesCount = 7;
    expect(totalLikes([{likes: likesCount}])).toBe(likesCount);
  });

  test('should return sum of likes of all blogs', () => {
    const expected = 14;
    expect(totalLikes(fakeBlogs)).toBe(expected);
  });
});

describe('favorite blog', () => {
  test('should return undefined when no blogs exist', () => {
    expect(favoriteBlog([])).toBe(undefined);
  });

  test('should return a single blog', () => {
    const onlyBlog = { title: 'bar', author: 'foo', likes: 0 };
    expect(favoriteBlog([onlyBlog])).toEqual(onlyBlog);
  });

  test('should return greatest blog of all blogs', () => {
    const expectedTitle = 'foo2';
    expect(favoriteBlog(fakeBlogs).title).toBe(expectedTitle);
  });
});

describe('most blogs', () => {
  test('should return undefined when no blogs', () => {
    expect(mostBlogs([])).toBe(undefined);
  });

  test('should return single blog author', () => {
    expect(mostBlogs([{ author: 'foo' }])).toEqual({ author: 'foo', blogs: 1});
  });

  test('should return author with most blogs', () => {
    const expectedAuthor = 'bar1';
    const expectedCount = 2;
    expect(mostBlogs(fakeBlogs)).toEqual({ author: expectedAuthor, blogs: expectedCount });
  });
});

describe('most likes', () => {
  test('should return undefined when no blogs', () => {
    expect(mostLikes([])).toBe(undefined);
  });

  test('should return single blog author', () => {
    expect(mostLikes([{ author: 'foo', likes: 12, title: 'bar' }])).toEqual({ author: 'foo', likes: 12 });
  });

  test('should return author with most blogs', () => {
    const expectedAuthor = 'bar2';
    const expectedCount = 7;
    expect(mostLikes(fakeBlogs)).toEqual({ author: expectedAuthor, likes: expectedCount });
  });

  test('should sum up likes correctly', () => {
    const expectedAuthor = 'bar1';
    const testBlogs = fakeBlogs.concat({ author: expectedAuthor, likes: 11 });
    const expectedCount = 16;
    expect(mostLikes(testBlogs)).toEqual({ author: expectedAuthor, likes: expectedCount });
  });
});
