export interface Diagnosis {
    code: string;
    name: string;
    lating?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
    type: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    healthCheckRating: HealthCheckRating;
  }

export interface discharge {
    date: string,
    criteria: string
}
export interface HospitalEntry extends BaseEntry {
    discharge: discharge;
}

export interface sickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string;
    sickLeave?: sickLeave;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry; 

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type NoSsnPatient = Omit<Patient, 'ssn'| 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
/*
export enum Type {
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck"
}
*/