import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';
import Select from 'react-select';

const UpdateYearForm = ({ authors }) => {
  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const [updateBirthyear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();

    updateBirthyear({
      variables: { name: selectedOption.value, born: Number(born) },
    });

    setBorn('');
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select onChange={setSelectedOption} options={options} />
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateYearForm;
