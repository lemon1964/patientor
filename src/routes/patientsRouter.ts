import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import patientService from "../services/patientService";
import { PatientTypes, NewPatientEntryTypes, ExpandedPatientTypes, EntryTypes } from "../types";
import { NewEntrySchema, toNewEntry } from "../utils";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const NewEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const parsedEntry = toNewEntry(req.body);
    req.body = parsedEntry;
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get("/", (_req, res: Response<PatientTypes[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req: Request, res: Response<ExpandedPatientTypes | { message: string }>) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntryTypes>, res: Response<PatientTypes>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  }
);

router.post("/:id/entries", NewEntryParser, (req: Request, res: Response) => {
  try {
    const addedEntry = patientService.addEntryToPatient(String(req.params.id), req.body as EntryTypes);
    res.json(addedEntry);
  } catch (error: unknown) {
    res.status(400).send({ error: (error as Error).message });
  }
});

router.use(errorMiddleware);

export default router;
