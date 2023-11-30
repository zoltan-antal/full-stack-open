import { DiaryEntry } from '../types';
import Entry from './Entry';

interface EntriesProps {
  entries: DiaryEntry[];
}

const Entries = ({ entries }: EntriesProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default Entries;
