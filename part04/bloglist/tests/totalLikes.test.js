const { totalLikes } = require('../utils/list_helper');
const { listWithOneBlog, listWithManyBlogs } = require('./blog_data');

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has several blogs, equals the sum of all the likes', () => {
    const result = totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});
