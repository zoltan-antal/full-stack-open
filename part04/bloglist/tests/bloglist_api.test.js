const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

let token;
beforeAll(async () => {
  await User.deleteMany({});

  const newUser = {
    username: 'example',
    password: 'example',
  };
  await api.post('/api/users').send(newUser);
  const response = await api.post('/api/login').send(newUser);
  token = response.body.token;
});

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
      .set('Authorization', `Bearer ${token}`)
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

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
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

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('new blog without url gets rejected', async () => {
    const newBlog = {
      title: 'Example title',
      author: 'Example author',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe('DELETE', () => {
  test('deleting a blog', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blog = {
      title: 'Example title',
      author: 'Example author',
      url: 'example.com',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog);

    const blogsAfterAdd = await helper.blogsInDb();
    expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length + 1);

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blog.title);
  });
});

describe('PUT', () => {
  test('updating a blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const updatedBlog = blogsAtStart[0];
    updatedBlog.likes = Math.floor(Math.random() * 100);

    const response = await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.likes).toBe(updatedBlog.likes);

    const blogsAtEnd = await helper.blogsInDb();
    blogsAtEnd.forEach((blog) => {
      if (blog.title === updatedBlog.title) {
        expect(blog).toEqual(updatedBlog);
      }
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
