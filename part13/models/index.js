const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./readingList');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'saved_blogs' });
Blog.belongsToMany(User, { through: ReadingList, as: 'users_saved' });

module.exports = {
  Blog,
  User,
};
