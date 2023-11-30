import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import patientService from '../services/patients';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const id = useParams().id as string;

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await patientService.getOne(id);
      setPatient(fetchedPatient);
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
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
    </div>
  );
};

export default PatientPage;
