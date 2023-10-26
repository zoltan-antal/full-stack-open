const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper');
const { listWithOneBlog, listWithManyBlogs } = require('./blog_data');

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});

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

describe('favourite blog', () => {
  test('when list has only one blog, equals to that blog', () => {
    const result = favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('when list has several blogs, equals the blog with the most likes', () => {
    const result = favoriteBlog(listWithManyBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

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
