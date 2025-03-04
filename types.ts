export interface Diagnosis {
    code: string;
    name: string;
    lating?: string;
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NoSsnPatient = Omit<Patient, 'ssn'>;

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}