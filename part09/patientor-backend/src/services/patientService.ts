import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  NewEntry,
  Entry,
} from '../types';

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): PatientEntry => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error('Patient does not exist with id: ' + id);
  }
  return patient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    ...entry,
    id: uuidv4(),
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: PatientEntry['id'], entry: NewEntry): Entry => {
  const newEntry = {
    ...entry,
    id: uuidv4(),
  };

  patients.forEach((patient) => {
    if (patient.id === id) {
      patient.entries.push(newEntry);
    }
  });

  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry,
};
