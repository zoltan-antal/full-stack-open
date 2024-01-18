const router = require('express').Router();

const { ReadingList } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

router.post('/', async (req, res) => {
  const entry = await ReadingList.create(req.body);
  return res.json(entry);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const entry = await ReadingList.findByPk(req.params.id);
  if (entry.userId !== req.decodedToken.id) {
    return res.status(401).end();
  }
  entry.isRead = req.body.read;
  await entry.save();
  return res.json(entry);
});

module.exports = router;
