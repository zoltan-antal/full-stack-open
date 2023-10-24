require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const Person = require('./models/person');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', (request, response) =>
  request.method === 'POST' ? JSON.stringify(request.body) : ' '
);
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/info', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.send(
        `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        `
      );
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(400).json({
      error: 'name or number is missing',
    });
    return;
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(400).json({
      error: 'name or number is missing',
    });
    return;
  }

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response
          .status(404)
          .send({
            error: `${body.name} has already been deleted from the server`,
          });
      }
    })
    .then(() => {
      Person.findByIdAndUpdate(request.params.id, person, {
        new: true,
        runValidators: true,
        context: 'query',
      })
        .then((updatedPerson) => {
          response.json(updatedPerson);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
