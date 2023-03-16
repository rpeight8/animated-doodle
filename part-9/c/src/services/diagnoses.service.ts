import data from '../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses = data;

export const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export const addEntry = (diagnosis: Diagnosis): void => {
  diagnoses.push(diagnosis);
};
