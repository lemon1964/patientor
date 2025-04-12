import { NewPatientEntryTypes, Gender, HealthCheckRatingTypes } from "./types";
import { z } from "zod";

export const HealthCheckSchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRatingTypes),
});

export const OccupationalHealthcareSchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const HospitalSchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const EntrySchemaEntry = z.union([HealthCheckSchema, OccupationalHealthcareSchema, HospitalSchema]);

export const NewEntrySchema = z.object({
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  name: z.string(),
  occupation: z.string(),
  entries: z.array(EntrySchemaEntry).optional(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntryTypes => {
  return NewEntrySchema.parse(object);
};

export const NewHealthCheckEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRatingTypes),
});

export const NewOccupationalHealthcareEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const NewHospitalEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const NewPatientEntrySchema = z.object({
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  name: z.string(),
  occupation: z.string(),
  entries: z.array(NewEntrySchema).optional(),
});

import { HealthCheckEntryTypes, OccupationalHealthcareEntryTypes, HospitalEntryTypes, EntryTypes } from "./types"; // Импорт типов

export const toNewEntry = (object: unknown): EntryTypes => {
  switch ((object as { type: string }).type) {
    case "HealthCheck":
      return NewHealthCheckEntrySchema.parse(object) as HealthCheckEntryTypes;
    case "OccupationalHealthcare":
      return NewOccupationalHealthcareEntrySchema.parse(object) as OccupationalHealthcareEntryTypes;
    case "Hospital":
      return NewHospitalEntrySchema.parse(object) as HospitalEntryTypes;
    default:
      throw new Error("Invalid entry type");
  }
};
