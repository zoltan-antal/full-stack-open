import { useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types';
import diaryService from '../services/diaryService';
import axios from 'axios';

interface EntryFormProps {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const EntryForm = ({ setEntries, entries }: EntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };
    try {
      const createdEntry = await diaryService.createEntry(newEntry);
      setEntries([...entries, createdEntry]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        createErrorMessage(error.response?.data);
      } else {
        createErrorMessage('An unknown error has ocurred.');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <label>
          date
          <input
            type="text"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          visibility
          <input
            type="text"
            name="visibility"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </label>
        <label>
          weather
          <input
            type="text"
            name="weather"
            onChange={(e) => setWeather(e.target.value)}
          />
        </label>
        <label>
          comment
          <input
            type="text"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;
