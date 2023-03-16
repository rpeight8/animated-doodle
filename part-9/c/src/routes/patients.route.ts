import express from 'express';
import { getEntries, addEntry, findById } from '../services/patients.service';
import { Patient } from '../types';

const router = express.Router();

router
  .route('/')
  .get((_req, res) => {
    res.json(getEntries());
  })
  .post((req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body as Patient;
    const newPatientEntry = addEntry({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    });

    res.json(newPatientEntry);
  });

router.route('/:id').get((req, res) => {
  const patient = findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).end();
  }
});

export default router;
