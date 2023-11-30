import { DiaryEntry } from '../types';

interface EntryProps {
  entry: DiaryEntry;
}

const Entry = ({ entry }: EntryProps) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      visibility: {entry.visibility}
      <br />
      weather: {entry.weather}
      <br />
      <em>{entry.comment}</em>
    </div>
  );
};

export default Entry;
