const router = require('express').Router();

const { Session } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({ where: { token: req.token } });
  return res.status(204).end();
});

module.exports = router;
