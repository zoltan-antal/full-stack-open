const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const favorite = blogs.reduce(
    (acc, curr) => (curr.likes > acc.likes ? curr : acc),
    blogs[0]
  );

  return _.pick(favorite, ['title', 'author', 'likes']);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = {};

  blogs.forEach((blog) => {
    const author = blog.author;

    if (authors[author]) {
      authors[author]++;
    } else {
      authors[author] = 1;
    }
  });

  const author = Object.keys(authors).reduce(
    (acc, curr) => (authors[curr] > authors[acc] ? curr : acc),
    Object.keys(authors)[0]
  );

  return {
    author,
    blogs: authors[author],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const author = blogs.reduce((acc, curr) =>
    curr.likes > acc.likes ? _.pick(curr, ['author', 'likes']) : acc
  ).author;

  return {
    author,
    likes: blogs.reduce(
      (acc, curr) => (curr.author === author ? acc + curr.likes : acc),
      0
    ),
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
