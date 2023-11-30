import { useState } from 'react';
import axios from 'axios';
import { EntryFormValues, Patient } from '../types';
import patientService from '../services/patients';

interface EntryFormProps {
  setEntryFormStatus: React.Dispatch<React.SetStateAction<'open' | 'closed'>>;
  patient: Patient | null;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  createErrorMessage: (message: string) => void;
}

const EntryForm = ({
  setEntryFormStatus,
  patient,
  setPatient,
  createErrorMessage,
}: EntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry: EntryFormValues = {
      type: 'HealthCheck',
      description: description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      ...(diagnosisCodes ? { diagnosisCodes: diagnosisCodes.split(', ') } : {}),
    };
    try {
      const returnedEntry = await patientService.addEntry(
        patient!.id,
        newEntry
      );
      setPatient({
        ...patient!,
        entries: [...patient!.entries, returnedEntry],
      });
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating('');
      setDiagnosisCodes('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        createErrorMessage(error.response?.data);
      } else {
        createErrorMessage('An unknown error has ocurred.');
      }
    }
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
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Date
          <input
            type="text"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Specialist
          <input
            type="text"
            value={specialist}
            required
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </label>
        <label>
          Health check rating
          <input
            type="text"
            value={healthCheckRating}
            required
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
