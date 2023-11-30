import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../types';
import patientService from '../services/patients';
import EntryCard from './EntryCard';
import EntryForm from './EntryForm';

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [entryFormStatus, setEntryFormStatus] = useState<'open' | 'closed'>(
    'closed'
  );
  const [errorMessage, setErrorMessage] = useState('');

  const id = useParams().id as string;

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await patientService.getOne(id);
      setPatient(fetchedPatient);
    };
    fetchPatient();
  }, [id]);

  const createErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  if (!patient || !diagnoses || diagnoses.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>
        gender: {patient.gender}
        <br />
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {entryFormStatus === 'closed' && (
        <button onClick={() => setEntryFormStatus('open')}>
          add new entry
        </button>
      )}
      {entryFormStatus === 'open' && (
        <EntryForm
          setEntryFormStatus={setEntryFormStatus}
          patient={patient}
          setPatient={setPatient}
          createErrorMessage={createErrorMessage}
        />
      )}
      <h3>entries</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {patient.entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
