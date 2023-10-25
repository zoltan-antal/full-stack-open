const listHelper = require('../utils/list_helper');
const { listWithOneBlog, listWithManyBlogs } = require('./blog_data');

describe('favourite blog', () => {
  test('when list has only one blog, equals to that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('when list has several blogs, equals the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});
