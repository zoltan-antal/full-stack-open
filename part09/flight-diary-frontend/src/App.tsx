import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import diaryService from './services/diaryService';
import EntryForm from './components/EntryForm';
import Entries from './components/Entries';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await diaryService.getAllEntries();
      setEntries(entries);
    };
    fetchEntries();
  }, []);

  return (
    <>
      <EntryForm entries={entries} setEntries={setEntries} />
      <Entries entries={entries} />
    </>
  );
}

export default App;
