import diagnosesData from "../../data/diagnosesData";
import { DiagnosisTypes, NonSensitiveDiagnosisTypes } from "../types";

const getDiagnoses = (): DiagnosisTypes[] => {
  return diagnosesData as DiagnosisTypes[];
};

const getNonSensitiveDiagnoses = (): NonSensitiveDiagnosisTypes[] => {
  return diagnosesData.map(({ code, name }) => ({
    code,
    name,
  }));
};

export default {
  getDiagnoses,
  getNonSensitiveDiagnoses,
};
