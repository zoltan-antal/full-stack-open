const express = require('express');
const router = express.Router();

const redis = require('../redis');

const configs = require('../util/config');

let visits = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

/* GET added todos counter. */
router.get('/statistics', async (req, res) => {
  console.log('getting added_todos');
  const todoCount = Number(await redis.getAsync('added_todos'));
  console.log(todoCount);
  res.send({ added_todos: todoCount ? todoCount : 0 });
});

module.exports = router;
