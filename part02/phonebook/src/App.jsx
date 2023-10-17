import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  function addPerson(e) {
    e.preventDefault();

    if (newName === '') {
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (personExists) {
      if (personExists.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
        return;
      }

      if (
        confirm(
          `${newName} is already in the phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personExists.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName('');
        setNewNumber('');
      });
    }
  }

  function deletePerson(id) {
    if (confirm(`Delete ${persons.find((person) => person.id === id).name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
