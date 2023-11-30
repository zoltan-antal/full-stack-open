import { useState } from 'react';
import { EntryFormValues, Patient } from '../types';
import patientService from '../services/patients';

interface EntryFormProps {
  setEntryFormStatus: React.Dispatch<React.SetStateAction<'open' | 'closed'>>;
  patient: Patient | null;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const EntryForm = ({
  setEntryFormStatus,
  patient,
  setPatient,
}: EntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const handleSubmit = async () => {
    const newEntry: EntryFormValues = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: diagnosisCodes.split(', '),
    };
    const returnedEntry = await patientService.addEntry(patient!.id, newEntry);

    setPatient({ ...patient!, entries: [...patient!.entries, returnedEntry] });

    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes('');
  };

  return (
    <div style={{ border: '1px solid black' }}>
      <h3>New HealthCheck entry</h3>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Date
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Specialist
          <input
            type="text"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </label>
        <label>
          Health check rating
          <input
            type="text"
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(e.target.value)}
          />
        </label>
        <label>
          Diagnosis codes
          <input
            type="text"
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value)}
          />
        </label>
        <div>
          <button type="button" onClick={() => setEntryFormStatus('closed')}>
            cancel
          </button>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
