const { mostBlogs } = require('../utils/list_helper');
const { listWithOneBlog, listWithManyBlogs } = require('./blog_data');

describe('most blogs', () => {
  test('when list has only one blog, equals the author of that blog', () => {
    const result = mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });

  test('when list has several blogs, equals the author with the most blogs', () => {
    const result = mostBlogs(listWithManyBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});
