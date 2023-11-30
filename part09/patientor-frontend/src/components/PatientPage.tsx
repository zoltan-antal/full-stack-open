import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../types';
import patientService from '../services/patients';
import EntryCard from './EntryCard';

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const id = useParams().id as string;

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await patientService.getOne(id);
      setPatient(fetchedPatient);
    };
    fetchPatient();
  }, [id]);

  if (!patient || !diagnoses) {
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
      <h3>entries</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {patient.entries.map((entry) => (
          <EntryCard entry={entry} diagnoses={diagnoses} />
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
