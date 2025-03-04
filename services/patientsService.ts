import data from "../data/patients";
import { Patient, NoSsnPatient, Gender } from "../types";


const getPatients = (): Patient[] => {
    return data.map(patient => toPatient(patient));
};

const getPatientsNoSSN = (): NoSsnPatient[] => {
    return getPatients().map(({id, name, dateOfBirth, gender, occupation}) =>
    ({id,
    name,
    dateOfBirth,
    gender,
    occupation
    })
    );
};

const findPatientById = (id: string): Patient | undefined => {
    const patient = data.find(p => p.id === id);
    return toPatient(patient);
};

const isString = (param: unknown): param is string => {
    if(!param){
        throw new Error("Missing patient field");
    }
    return typeof param === 'string' || param instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error('Incorrect of missing gender' + gender);
    }
    return gender;
};

const toString = (param: unknown): string => {
    if(!param || !isString(param)){
        throw new Error("Incorrect data type");
    };
    return param;

};

const toPatient = (object: unknown): Patient => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    let id;
    if(!('id' in object)){
        id = String(Math.floor(Math.random()*10000000));
    }
    else{
        id = object.id;
    }
    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
    const newPatient = {
            id : toString(id),
            name: toString(object.name),
            dateOfBirth: toString(object.dateOfBirth),
            ssn: toString(object.ssn),
            gender: parseGender(object.gender),
            occupation: toString(object.occupation)
        };
    //data.push(newPatient);
    //console.log(data);
    return newPatient;
    }
    else{ 
        throw new Error('Incorrect data: some fields missing'); }
}; 
/*
const addPatient = (
    name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
): Patient => {
    const newPatient = {
        id : String(Math.floor(Math.random()*10000000)),
        name: name,
        dateOfBirth: dateOfBirth,
        ssn: ssn,
        gender: gender,
        occupation: occupation
    };
    //data.push(newPatient.toJson());
    return newPatient;
};
*/
export default { getPatients, getPatientsNoSSN, findPatientById, /*addPatient,*/ toPatient };