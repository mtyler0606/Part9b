import data from "../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = data;
const getDiagnosesData = () => {
    return diagnoses;
};

export default {
    getDiagnosesData
};