//import data from "../data/patients";
import patients from "../data/patients_full";
import { Patient, NoSsnPatient, Gender, Entry, HospitalEntry, discharge, HealthCheckEntry, OccupationalHealthcareEntry, HealthCheckRating, sickLeave } from "../types";


const getPatients = (): Patient[] => {
    return patients.map(patient => toPatient(patient));
};

const getPatientsNoSSN = (): NoSsnPatient[] => {
    return getPatients().map(({id, name, dateOfBirth, gender, occupation, entries}) =>
    ({id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
    })
    );
};

const findPatientById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
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
    if(Number.isInteger(param)){
        return String(param);
    }
    if(!param || !isString(param)){
        throw new Error(`Incorrect data type: not a string ${param}`);
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
        let entries: Entry[] = [];
        if('entries' in object && object.entries instanceof Array){
            entries = object.entries.map(entry => toEntry(entry));
        }
    
        const newPatient = {
            id : toString(id),
            name: toString(object.name),
            dateOfBirth: toString(object.dateOfBirth),
            ssn: toString(object.ssn),
            gender: parseGender(object.gender),
            occupation: toString(object.occupation),
            entries: entries
        };
    //data.push(newPatient);
    //console.log(data);
    return newPatient;
    }
    else{ 
        throw new Error('Incorrect data: some Patient fields missing'); }
};

const returnDischarge = (object: unknown): discharge => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    if("date" in object && "criteria" in object){
        return { date: toString(object.date), criteria: toString(object.criteria)};
    } else{ 
        throw new Error('Incorrect data: Discharge missing or incorrect'); }

};

const returnSickLeave = (object: unknown): sickLeave => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    if("startDate" in object && "endDate" in object){
        return { startDate: toString(object.startDate), endDate: toString(object.endDate)};
    } else{ 
        throw new Error('Incorrect data: Sick Leave missing or incorrect'); }

};

const validDiagnosisCodes = (object: unknown): string[] => {
    if(object instanceof Array){
        return object.map(item => toString(item));
    } else{
        return [] as string[];
    }
};

const toHospitalEntry= (object: unknown): HospitalEntry => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    if ('type' in object && 'id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'discharge' in object && 'diagnosisCodes' in object){
                //const type: Type = Type.Hospital;
                const newEntry= {
                    id : toString(object.id),
                    description : toString(object.description),
                    date : toString(object.date),
                    specialist: toString(object.specialist),
                    type: 'Hospital',
                    diagnosisCodes: validDiagnosisCodes(object.diagnosisCodes),
                    discharge: returnDischarge(object.discharge)
                };
                return newEntry;

        }
    else if('type' in object && 'id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'discharge' in object ){
        const newEntry= {
            id : toString(object.id),
            description : toString(object.description),
            date : toString(object.date),
            specialist: toString(object.specialist),
            type: "Hospital",
            discharge: returnDischarge(object.discharge)
        };
        return newEntry;
    }
       
    else{ 
        throw new Error('Incorrect data: some Hospital Entry fields missing'); }
};

const toHealthCheckRating = (rating: string): HealthCheckRating => {
    switch(rating){
        case '0':
            return HealthCheckRating.Healthy;
        case '1':
            return HealthCheckRating.LowRisk;
        case '2':
            return HealthCheckRating.HighRisk;
        case '3':
            return HealthCheckRating.CriticalRisk;
    }
    throw new Error('Incorrect data: Incorrect Health Check Rating');
};

const toEntry = (object:unknown): Entry => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    if('type' in object){
        switch(object.type){
            case 'Hospital':
                return toHospitalEntry(object);
            case 'HealthCheck':
                return toHealthCheckEntry(object);
            case 'OccupationalHealthcare':
                return toOccupationalEntry(object);
        }
    }
    throw new Error('Incorrect data: Entry in incorrect form');
};

const toHealthCheckEntry= (object: unknown): HealthCheckEntry => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    if ('type' in object && 'id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'healthCheckRating' in object){
                //const type: Type = Type.Hospital;
                const newEntry= {
                    id : toString(object.id),
                    description : toString(object.description),
                    date : toString(object.date),
                    specialist: toString(object.specialist),
                    type: 'HealthCheck',
                    diagnosisCodes: validDiagnosisCodes(object.diagnosisCodes),
                    healthCheckRating: toHealthCheckRating(toString(object.healthCheckRating))

                };
                return newEntry;

        }
    else if('type' in object && 'id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'healthCheckRating' in object){
        //const type: Type = Type.Hospital;
        const newEntry= {
            id : toString(object.id),
            description : toString(object.description),
            date : toString(object.date),
            specialist: toString(object.specialist),
            type: 'HealthCheck',
            healthCheckRating: toHealthCheckRating(toString(object.healthCheckRating))

        };
        return newEntry;
    }   
    else{
        throw new Error('Incorrect data: some Health Check fields missing'); }
};

const toOccupationalEntry = (object: unknown): OccupationalHealthcareEntry => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    if ('type' in object && 'id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'employerName' in object && 'sickLeave' in object){
                //const type: Type = Type.Hospital;
                const newEntry= {
                    id : toString(object.id),
                    description : toString(object.description),
                    date : toString(object.date),
                    specialist: toString(object.specialist),
                    type: 'OccupationalHealthcare',
                    diagnosisCodes: validDiagnosisCodes(object.diagnosisCodes),
                    sickLeave: returnSickLeave(object.sickLeave),
                    employerName: toString(object.employerName)

                };
                return newEntry;

        }
    else if('type' in object && 'id' in object && 'description' in object && 'date' in object && 'specialist' in object &&  'employerName' in object){
        //const type: Type = Type.Hospital;
        const newEntry= {
            id : toString(object.id),
            description : toString(object.description),
            date : toString(object.date),
            specialist: toString(object.specialist),
            type: 'OccupationalHealthcare',
            employerName: toString(object.employerName)

        };
        return newEntry;

}
    else{ 
        if('id' in object){
            console.log(object.id);
        }
        throw new Error('Incorrect data: some Occupational Healthcare fields missing'); }
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
export default { getPatients, getPatientsNoSSN, findPatientById, /*addPatient,*/ toPatient, toHealthCheckEntry, toOccupationalEntry, toHospitalEntry, toEntry };