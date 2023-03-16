import data from '../data/patients';
import { Patient } from '../types';

const patients = data;

export const getEntries = (): Array<Patient> => {
  return patients;
};

export const addEntry = (patient: Patient): void => {
  patients.push(patient);
};
