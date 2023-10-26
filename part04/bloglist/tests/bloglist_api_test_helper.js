const Blog = require('../models/blog');
const { listWithManyBlogs } = require('./blog_data');

const initialBlogs = [...listWithManyBlogs];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
