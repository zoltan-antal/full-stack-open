import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { EntryFormValues, Patient } from '../types';
import patientService from '../services/patients';

interface EntryFormProps {
  setEntryFormStatus: React.Dispatch<React.SetStateAction<'open' | 'closed'>>;
  patient: Patient | null;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  possibleDiagnosisCodes: string[];
  createErrorMessage: (message: string) => void;
}

const EntryForm = ({
  setEntryFormStatus,
  patient,
  setPatient,
  possibleDiagnosisCodes,
  createErrorMessage,
}: EntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Set<string>>(new Set());

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const diagnosisCodesArray = Array.from(diagnosisCodes);
    console.log(diagnosisCodesArray);
    const newEntry: EntryFormValues = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      ...(diagnosisCodesArray.length > 0
        ? { diagnosisCodes: diagnosisCodesArray }
        : {}),
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
      setDiagnosisCodes(new Set());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        createErrorMessage(error.response?.data);
      } else {
        createErrorMessage('An unknown error has ocurred.');
      }
    }
  };

  const handleDiagnosisCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDiagnosisCodes((prevCodes) => new Set([...prevCodes, e.target.value]));
    } else {
      setDiagnosisCodes((prevCodes) => {
        const newCodes = new Set(prevCodes);
        newCodes.delete(e.target.value);
        return newCodes;
      });
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
            type="date"
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
            type="number"
            min="0"
            max="3"
            value={healthCheckRating}
            required
            onChange={(e) => setHealthCheckRating(e.target.value)}
          />
        </label>
        <label>
          Diagnosis codes:
          <br />
          <div>
            {possibleDiagnosisCodes.map((code) => (
              <label key={code}>
                {code}
                <input
                  key={code}
                  type="checkbox"
                  value={code}
                  onChange={handleDiagnosisCodeChange}
                />
              </label>
            ))}
          </div>
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
