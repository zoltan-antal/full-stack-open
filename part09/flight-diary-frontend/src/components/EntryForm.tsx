import { useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types';
import diaryService from '../services/diaryService';

interface EntryFormProps {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const EntryForm = ({ setEntries, entries }: EntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };
    const createdEntry = await diaryService.createEntry(newEntry);
    setEntries([...entries, createdEntry]);
  };

  return (
    <div>
      <h2>Add new entry</h2>
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
