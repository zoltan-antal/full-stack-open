const Blog = require('../models/blog');
const User = require('../models/user');
const { listWithManyBlogs } = require('./blog_data');

const initialBlogs = [...listWithManyBlogs];
const initialUsers = [
  {
    username: 'example',
    password: 'example',
    name: 'example',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
};
