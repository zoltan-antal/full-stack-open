const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./bloglist_api_test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('GET', () => {
  test('correct number of blogs are returned, and as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('POST', () => {
  test('new blog can be added', async () => {
    const newBlog = {
      title: 'Example title',
      author: 'Example author',
      url: 'example.com',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });

  test('likes default to 0', async () => {
    const newBlog = {
      title: 'Example title',
      author: 'Example author',
      url: 'example.com',
    };

    await api.post('/api/blogs').send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    blogsAtEnd.forEach((blog) => {
      if (blog.title === newBlog.title) {
        expect(blog.likes).toBeDefined();
        expect(blog.likes).toBe(0);
      }
    });
  });

  test('new blog without title gets rejected', async () => {
    const newBlog = {
      author: 'Example author',
      url: 'example.com',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('new blog without url gets rejected', async () => {
    const newBlog = {
      title: 'Example title',
      author: 'Example author',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
