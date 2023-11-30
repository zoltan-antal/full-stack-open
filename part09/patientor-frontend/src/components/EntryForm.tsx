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
  const [type, setType] = useState('Hospital');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState(false);
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Set<string>>(new Set());

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const diagnosisCodesArray = Array.from(diagnosisCodes);
    try {
      switch (type) {
        case 'Hospital':
          const newHospitalEntry: EntryFormValues = {
            type: 'Hospital',
            description,
            date,
            specialist,
            discharge: { date: dischargeDate, criteria: dischargeCriteria },
            ...(diagnosisCodesArray.length > 0
              ? { diagnosisCodes: diagnosisCodesArray }
              : {}),
          };
          const returnedHospitalEntry = await patientService.addEntry(
            patient!.id,
            newHospitalEntry
          );
          setPatient({
            ...patient!,
            entries: [...patient!.entries, returnedHospitalEntry],
          });
          break;

        case 'OccupationalHealthcare':
          const newOccupationalHealthcareEntry: EntryFormValues = {
            type: 'OccupationalHealthcare',
            description,
            date,
            specialist,
            employerName,
            ...(sickLeave
              ? {
                  sickLeave: {
                    startDate: sickLeaveStartDate,
                    endDate: sickLeaveEndDate,
                  },
                }
              : {}),
            ...(diagnosisCodesArray.length > 0
              ? { diagnosisCodes: diagnosisCodesArray }
              : {}),
          };
          const returnedOccupationalHealthcareEntry =
            await patientService.addEntry(
              patient!.id,
              newOccupationalHealthcareEntry
            );
          setPatient({
            ...patient!,
            entries: [...patient!.entries, returnedOccupationalHealthcareEntry],
          });
          break;

        case 'HealthCheck':
          const newHealthCheckEntry: EntryFormValues = {
            type: 'HealthCheck',
            description,
            date,
            specialist,
            healthCheckRating: Number(healthCheckRating),
            ...(diagnosisCodesArray.length > 0
              ? { diagnosisCodes: diagnosisCodesArray }
              : {}),
          };
          const returnedHealthCheckEntry = await patientService.addEntry(
            patient!.id,
            newHealthCheckEntry
          );
          setPatient({
            ...patient!,
            entries: [...patient!.entries, returnedHealthCheckEntry],
          });
          break;

        default:
          break;
      }
      setDescription('');
      setDate('');
      setSpecialist('');
      setDischargeDate('');
      setDischargeCriteria('');
      setEmployerName('');
      setSickLeave(false);
      setSickLeaveStartDate('');
      setSickLeaveEndDate('');
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
      <label>
        Entry type
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Hospital" selected>
            Hospital
          </option>
          <option value="OccupationalHealthcare">OccupationalHealthcare</option>
          <option value="HealthCheck">HealthCheck</option>
        </select>
      </label>
      <h3>New {type} entry</h3>
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
        {type === 'Hospital' && (
          <label>
            Discharge date
            <input
              type="date"
              value={dischargeDate}
              required
              onChange={(e) => setDischargeDate(e.target.value)}
            />
          </label>
        )}
        {type === 'Hospital' && (
          <label>
            Discharge criteria
            <input
              type="text"
              value={dischargeCriteria}
              required
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </label>
        )}
        {type === 'OccupationalHealthcare' && (
          <label>
            Employer name
            <input
              type="text"
              value={employerName}
              required
              onChange={(e) => setEmployerName(e.target.value)}
            />
          </label>
        )}
        {type === 'OccupationalHealthcare' && (
          <div>
            <label>
              Sick leave?
              <input
                type="checkbox"
                checked={sickLeave}
                onChange={(e) => setSickLeave(e.target.checked)}
              />
            </label>
            {sickLeave && (
              <>
                <label>
                  Start date
                  <input
                    type="date"
                    value={sickLeaveStartDate}
                    required
                    onChange={(e) => setSickLeaveStartDate(e.target.value)}
                  />
                </label>
                <label>
                  End date
                  <input
                    type="date"
                    value={sickLeaveEndDate}
                    required
                    onChange={(e) => setSickLeaveEndDate(e.target.value)}
                  />
                </label>
              </>
            )}
          </div>
        )}
        {type === 'HealthCheck' && (
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
        )}
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
                  checked={Array.from(diagnosisCodes).includes(code)}
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
