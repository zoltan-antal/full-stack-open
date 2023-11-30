import {
  Diagnosis,
  Discharge,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatientEntry,
  SickLeave,
} from './types';

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const isSsn = (value: string): boolean => {
  return /^[a-zA-Z0-9]+-[a-zA-Z0-9]+$/.test(value);
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(value);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Invalid name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Invalid date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error('Invalid ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Invalid gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Invalid occupation: ' + occupation);
  }
  return occupation;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    !(
      'name' in object &&
      'dateOfBirth' in object &&
      'ssn' in object &&
      'gender' in object &&
      'occupation' in object &&
      'entries' in object
    )
  ) {
    throw new Error('Incorrect data: some fields are missing');
  }

  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };

  return newEntry;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    !(
      'type' in object &&
      'description' in object &&
      'date' in object &&
      'specialist' in object
    )
  ) {
    throw new Error('Incorrect data: some fields are missing');
  }

  switch (object.type) {
    case 'Hospital':
      if (!('discharge' in object)) {
        throw new Error('Incorrect data: some fields are missing');
      }
      const discharge = object.discharge as Discharge;
      if (!('date' in discharge && 'criteria' in discharge)) {
        throw new Error('Incorrect data: some fields are missing');
      }
      const newHospitalEntry: NewEntry = {
        type: object.type,
        description: object.description as string,
        date: object.date as string,
        specialist: object.specialist as string,
        ...('diagnosisCodes' in object
          ? {
              diagnosisCodes: object.diagnosisCodes as Array<Diagnosis['code']>,
            }
          : {}),
        discharge,
      };
      return newHospitalEntry;

    case 'OccupationalHealthcare':
      if (!('employerName' in object)) {
        throw new Error('Incorrect data: some fields are missing');
      }
      const newOccupationalHealthcareEntry: NewEntry = {
        type: object.type,
        description: object.description as string,
        date: object.date as string,
        specialist: object.specialist as string,
        ...('diagnosisCodes' in object
          ? {
              diagnosisCodes: object.diagnosisCodes as Array<Diagnosis['code']>,
            }
          : {}),
        employerName: object.employerName as string,
        ...('sickLeave' in object
          ? { sickLeave: object.sickLeave as SickLeave }
          : {}),
      };
      return newOccupationalHealthcareEntry;

    case 'HealthCheck':
      if (!('healthCheckRating' in object)) {
        throw new Error('Incorrect data: some fields are missing');
      }
      const newHealthCheckEntry: NewEntry = {
        type: object.type,
        description: object.description as string,
        date: object.date as string,
        specialist: object.specialist as string,
        ...('diagnosisCodes' in object
          ? {
              diagnosisCodes: object.diagnosisCodes as Array<Diagnosis['code']>,
            }
          : {}),
        healthCheckRating: object.healthCheckRating as HealthCheckRating,
      };
      return newHealthCheckEntry;

    default:
      throw new Error('Invalid type: ' + object.type);
  }
};

export { toNewPatientEntry, toNewEntry };
