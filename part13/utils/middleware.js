const jwt = require('jsonwebtoken');

const { SECRET } = require('./config');
const { User, Session } = require('../models');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.name);
  console.error(error.message);

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'invalid syntax' });
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.errors[0].message });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' });
  }

  const token = authorization.substring(7);
  req.token = token;
  try {
    const decodedToken = jwt.verify(token, SECRET);
    req.decodedToken = decodedToken;
  } catch {
    return res.status(401).json({ error: 'token invalid' });
  }
  const session = await Session.findOne({ where: { token } });
  if (!session) {
    return res.status(401).json({ error: 'token expired' });
  }
  const user = await User.findByPk(session.userId);
  if (user.isDisabled) {
    return res.status(401).json({ error: 'user disabled' });
  }

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
