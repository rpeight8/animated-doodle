import express from 'express';
import { getEntries, addEntry } from '../services/patients.service';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;
