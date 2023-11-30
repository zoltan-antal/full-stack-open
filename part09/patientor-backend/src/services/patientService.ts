import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getEntry = (id: string): PatientEntry => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error('Patient does not exist with id: ' + id);
  }
  return patient;
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    ...entry,
    id: uuidv4(),
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveEntries, getEntry, addEntry };
