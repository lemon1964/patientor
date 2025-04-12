import express from "express";
import { Response } from "express";
import diagnoseService from "../services/diagnoseService";
import { DiagnosisTypes } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<DiagnosisTypes[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;
