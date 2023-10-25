const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(
    (acc, curr) => (curr.likes > acc.likes ? curr : acc),
    blogs[0]
  );

  return _.pick(favorite, ['title', 'author', 'likes']);
};

const mostBlogs = (blogs) => {
  const authors = {};

  blogs.forEach((blog) => {
    const author = blog.author;

    if (authors[author]) {
      authors[author]++;
    } else {
      authors[author] = 1;
    }
  });

  const author = Object.keys(authors).reduce((acc, curr) =>
    authors[curr] > authors[acc] ? curr : acc
  );

  return {
    author: author,
    blogs: authors[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
