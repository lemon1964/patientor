import { PatientTypes, Gender } from "../src/types";
import { toNewPatientEntry } from "../src/utils";

const data = [
  {
    id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
    name: "Neo",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: Gender.Male,
    occupation: "Untouchable",
    entries: [
      {
        id: "54a8746e-34c4-4cf4-bf72-bfecd039be9a",
        date: "2019-05-01",
        specialist: "Dr Hippocrates",
        type: "HealthCheck",
        description: "Digital overdose, very bytestatic. Otherwise healthy.",
        healthCheckRating: 0,
      },
    ],
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Morpheus",
    dateOfBirth: "1979-01-30",
    ssn: "300179-777A",
    gender: Gender.Male,
    occupation: "Darkslayer",
    entries: [
      {
        id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
        date: "2019-08-05",
        type: "OccupationalHealthcare",
        specialist: "Dr Avicenna",
        employerName: "HyPD",
        diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"],
        description:
          "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ",
        sickLeave: {
          startDate: "2019-08-05",
          endDate: "2019-08-28",
        },
      },
    ],
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Agent Smith",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: Gender.Other,
    occupation: "Memory Eraser",
    entries: [
      {
        id: "54a8746e-34c4-4cf4-bf72-bfecd039be9d",
        date: "2025-04-01",
        specialist: "Dr Metrodora",
        type: "HealthCheck",
        description: "Acute alcohol intoxication. In pain control.",
        healthCheckRating: 3,
      },
    ],
  },
  {
    id: "d2773822-f723-11e9-8f0b-362b9e155667",
    name: "Trinity",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: Gender.Female,
    occupation: "Catwoman",
    entries: [
      {
        id: "b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da",
        date: "2019-10-20",
        specialist: "Dr Paracelsus",
        type: "HealthCheck",
        description: "Yearly control visit. Cholesterol levels back to normal.",
        healthCheckRating: 0,
      },
      {
        id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
        date: "2019-09-10",
        specialist: "Dr Galen",
        type: "OccupationalHealthcare",
        employerName: "FBI",
        description: "Prescriptions renewed.",
      },
      {
        id: "37be178f-a432-4ba4-aac2-f86810e36a15",
        date: "2018-10-05",
        specialist: "Dr Hippocrates",
        type: "HealthCheck",
        description:
          "Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.",
        healthCheckRating: 1,
      },
    ],
  },
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "Seraph",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: Gender.Male,
    occupation: "Minister of Magic",
    entries: [
      {
        id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
        date: "2015-01-02",
        type: "Hospital",
        specialist: "Dr Galen",
        diagnosisCodes: ["S62.5"],
        description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: "2015-01-16",
          criteria: "Thumb has healed.",
        },
      },
      {
        id: "54a8746e-34c4-4cf4-bf72-bfecd039be9e",
        date: "2025-04-01",
        specialist: "Dr Lemon",
        type: "HealthCheck",
        description: "Decrease in hemoglobin content in blood",
        healthCheckRating: 2,
      },
    ],
  },
];

const patientsData: PatientTypes[] = data.map(obj => {
  const object = toNewPatientEntry(obj) as PatientTypes;
  object.id = obj.id;
  return object;
});

export default patientsData;
