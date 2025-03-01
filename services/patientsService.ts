import data from "../data/patients";
import { Patient, NoSsnPatient } from "../types";


const getPatients = (): Patient[] => {
    return data;
};

const getPatientsNoSSN = (): NoSsnPatient[] => {
    return data.map(({id, name, dateOfBirth, gender, occupation}) =>
    ({id,
    name,
    dateOfBirth,
    gender,
    occupation
    })
    );
};

export default { getPatients, getPatientsNoSSN};