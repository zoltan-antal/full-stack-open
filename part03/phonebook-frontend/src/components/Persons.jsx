function Persons({ persons, handleDelete }) {
  return (
    <>
      {persons.map((person) => (
        <div
          key={person.id}
          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
}

export default Persons;
