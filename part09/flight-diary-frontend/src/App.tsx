import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllEntries } from './services/diaryService';
import Entries from './components/Entries';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await getAllEntries();
      setEntries(entries);
    };
    fetchEntries();
  }, []);

  return (
    <>
      <Entries entries={entries} />
    </>
  );
}

export default App;
