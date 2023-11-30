import { Diagnosis, Entry } from '../types';

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryCard = ({ entry, diagnoses }: EntryProps) => {
  return (
    <div style={{ border: '1px solid black' }}>
      <p>
        {entry.date}
        <br />
        <b>{entry.type}</b> visit
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      {(() => {
        switch (entry.type) {
          case 'Hospital':
            return (
              <div>
                discharged on <em>{entry.discharge.date}</em> with criteria:{' '}
                <em>{entry.discharge.criteria}</em>
              </div>
            );

          case 'OccupationalHealthcare':
            return (
              <div>
                employer: {entry.employerName}
                {entry.sickLeave &&
                  `sick leave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}
              </div>
            );

          case 'HealthCheck':
            return <div>health check rating: {entry.healthCheckRating}</div>;

          default:
            const _exhaustiveCheck: never = entry;
            return _exhaustiveCheck;
        }
      })()}
      <p>diagnose by {entry.specialist}</p>
      <ul>
        {diagnoses &&
          entry.diagnosisCodes?.map((code, index) => (
            <li key={`${code}-${index}`}>
              {code} {diagnoses.find((d) => d.code === code)!.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EntryCard;
