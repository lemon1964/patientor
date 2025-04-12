import { z } from "zod";
import { NewEntrySchema } from "./utils";

export interface DiagnosisTypes {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitiveDiagnosisTypes = Omit<DiagnosisTypes, "latin">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface PatientTypes {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries?: ExpandedEntry[];
}

export type NonSensitivePatientTypes = Omit<PatientTypes, "ssn" | "entries">;

export type NewPatientEntryTypes = z.infer<typeof NewEntrySchema>;

interface BaseEntryTypes {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  nameDiagnosisCodes?: DiagnosisTypes[];
}

export enum HealthCheckRatingTypes {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntryTypes extends BaseEntryTypes {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRatingTypes;
}

export interface OccupationalHealthcareEntryTypes extends BaseEntryTypes {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntryTypes extends BaseEntryTypes {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type EntryTypes = HealthCheckEntryTypes | OccupationalHealthcareEntryTypes | HospitalEntryTypes;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<EntryTypes, "id">;

interface ExpandedEntryTypes extends BaseEntryTypes {
  nameDiagnosisCodes?: DiagnosisTypes[];
}

export type ExpandedEntry =
  | (HealthCheckEntryTypes & ExpandedEntryTypes)
  | (HospitalEntryTypes & ExpandedEntryTypes)
  | (OccupationalHealthcareEntryTypes & ExpandedEntryTypes);

export interface ExpandedPatientTypes extends Omit<PatientTypes, "entries"> {
  entries?: ExpandedEntry[];
}
