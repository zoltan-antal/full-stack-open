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
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
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
      setErrorMessage('');
      setDate('');
      setVisibility(null);
      setWeather(null);
      setComment('');
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
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <div style={{ display: 'flex', gap: '15px' }}>
          visibility
          <div>
            {Object.values(Visibility).map((v) => (
              <label key={v}>
                {v}
                <input
                  type="radio"
                  name="visibility"
                  value={v}
                  checked={visibility === v}
                  onChange={(e) => setVisibility(e.target.value as Visibility)}
                />
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          weather
          <div>
            {Object.values(Weather).map((v) => (
              <label key={v}>
                {v}
                <input
                  type="radio"
                  name="weather"
                  value={v}
                  checked={weather === v}
                  onChange={(e) => setWeather(e.target.value as Weather)}
                />
              </label>
            ))}
          </div>
        </div>
        <label>
          comment
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;
