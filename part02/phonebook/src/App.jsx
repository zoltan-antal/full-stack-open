import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [acknowledgementMessage, setAcknowledgementMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
            setAcknowledgementMessage(`Changed number for ${newPerson.name}`);
            setTimeout(() => {
              setAcknowledgementMessage(null);
            }, 5000);
          })
          .catch(() => {
            setPersons(
              persons.filter((person) => person.id !== personExists.id)
            );
            setErrorMessage(
              `Information of ${newPerson.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName('');
        setNewNumber('');
        setAcknowledgementMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setAcknowledgementMessage(null);
        }, 5000);
      });
    }
  }

  function deletePerson(id) {
    const selectedPerson = persons.find((person) => person.id === id);

    if (confirm(`Delete ${selectedPerson.name}?`)) {
      personService.remove(id).finally(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={acknowledgementMessage} type={'acknowledgement'} />
      <Notification message={errorMessage} type={'error'} />
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
