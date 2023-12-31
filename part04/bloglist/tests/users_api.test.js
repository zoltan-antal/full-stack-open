const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe('POST', () => {
  test('valid user can be created', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: 'johndoe',
      password: 'something',
      name: 'John Doe',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });

  test('user without username gets rejected', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      password: 'something',
      name: 'John Doe',
    };

    await api.post('/api/users').send(user).expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('user without password gets rejected', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: 'example',
      name: 'John Doe',
    };

    await api.post('/api/users').send(user).expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('user with duplicate username gets rejected', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: 'example',
      password: 'something',
      name: 'John Doe',
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('user with too short username gets rejected', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: 'jd',
      password: 'something',
      name: 'John Doe',
    };

    await api.post('/api/users').send(user).expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('user with too short password gets rejected', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: 'johndoe',
      password: 'xy',
      name: 'John Doe',
    };

    await api.post('/api/users').send(user).expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
