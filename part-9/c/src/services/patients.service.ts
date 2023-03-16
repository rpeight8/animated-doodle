import data from '../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid';

const patients = data;

export const getEntries = (): PublicPatient[] => {
  return patients.map((patient) => {
    const omittedPatient = {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
    };
    return omittedPatient;
  });
};

export const addEntry = (patient: NewPatient): Patient => {
  const newPatient: Patient = { ...patient, id: uuid() as string };
  patients.push(newPatient);
  return newPatient;
};

export const findById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};
