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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
