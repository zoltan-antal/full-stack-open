const router = require('express').Router();

const { User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (!user) {
    res.status(404).end();
  }
  if (!req.body.username) {
    res.status(400).end();
  }
  console.log(req.body.username);
  user.username = req.body.username;
  user.save();
  res.json(user);
});

module.exports = router;
