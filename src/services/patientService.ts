import { v1 as uuid } from "uuid";
import patientsData from "../../data/patientsData";
import diagnosesData from "../../data/diagnosesData";
import {
  PatientTypes,
  NonSensitivePatientTypes,
  NewPatientEntryTypes,
  DiagnosisTypes,
  ExpandedEntry,
  EntryTypes,
} from "../types";

const getPatients = (): PatientTypes[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatientTypes[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  })) as NonSensitivePatientTypes[];
};

const getDiagnosesByCodes = (codes: string[]): DiagnosisTypes[] => {
  return diagnosesData.filter(diagnosis => codes.includes(diagnosis.code));
};

const findById = (id: string): PatientTypes | undefined => {
  const patient = patientsData.find(d => d.id === id);

  if (patient) {
    const entriesWithFullDiagnoses = patient.entries?.map((entry): ExpandedEntry => {
      const nameDiagnosisCodes = entry.diagnosisCodes ? getDiagnosesByCodes(entry.diagnosisCodes) : [];

      return {
        ...entry,
        nameDiagnosisCodes,
      };
    }) as ExpandedEntry[];

    return {
      ...patient,
      entries: entriesWithFullDiagnoses ?? [],
    };
  }

  return undefined;
};

const addPatient = (entry: NewPatientEntryTypes): PatientTypes => {
  const id = uuid();
  const newPatientEntry: PatientTypes = {
    id,
    ...entry,
    entries: entry.entries ?? [],
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (id: string, entry: EntryTypes): PatientTypes => {
  const patient = patientsData.find(d => d.id === id);
  if (patient) {
    const newEntry = {
      ...entry,
      id: uuid(),
    };
    patient.entries?.push(newEntry);
    return patient;
  }
  throw new Error("Patient not found");
};

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient,
  addEntryToPatient,
};
