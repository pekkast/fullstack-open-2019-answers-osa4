const { dummy, totalLikes } = require('../../utils/list_helper');

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
    const blogs = [{
        title: 'foo1',
        author: 'bar1',
        url: 'https://foo1.bar',
        likes: 3
      }, {
        title: 'foo2',
        author: 'bar2',
        url: 'https://foo2.bar',
        likes: 4

      }, {
        title: 'foo3',
        author: 'bar3',
        url: 'https://foo3.bar',
        likes: 7
      }
    ]
    expect(totalLikes(blogs)).toBe(expected);
  });
});
