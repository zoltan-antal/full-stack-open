const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
morgan.token('body', (request, response) =>
  request.method === 'POST' ? JSON.stringify(request.body) : ' '
);
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/info', (request, response) => {
  response.send(
    `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    response.status(404).end();
    return;
  }

  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    response.status(404).end();
    return;
  }

  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(400).json({
      error: 'name or number is missing',
    });
    return;
  }

  if (
    persons.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    response.status(409).json({
      error: 'name must be unique',
    });
    return;
  }

  const person = {
    id: Math.floor(Math.random() * 65536),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
