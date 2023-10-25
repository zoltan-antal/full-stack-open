const { mostLikes } = require('../utils/list_helper');
const { listWithOneBlog, listWithManyBlogs } = require('./blog_data');

describe('most likes', () => {
  test('when list has only one blog, equals the author of that blog', () => {
    const result = mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('when list has several blogs, equals the author of the blog with the most likes', () => {
    const result = mostLikes(listWithManyBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
