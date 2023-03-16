export enum Genders {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type Gender = 'male' | 'female' | 'other';

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};
export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn'>;
