const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(
    'for reading, give arguments like this: [password]\nfor creating, give arguments like this: [password] [name] [number]'
  );
  process.exit(1);
}

const username = 'zoltan-antal';
const password = process.argv[2];
const database = 'phonebookApp';

const url = `mongodb+srv://${username}:${password}@cluster0.hvcvu57.mongodb.net/${database}?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach(({ name, number }) => {
      console.log(`${name} ${number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
