const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }
  if (blog.user.toString() !== user.id) {
    return response.status(401).end();
  }

  await Blog.findByIdAndRemove(request.params.id);

  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id);
  await user.save();

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;
  const comment = body.comment;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: comment } },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  response.json(updatedBlog);
});

module.exports = blogsRouter;
