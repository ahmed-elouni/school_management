import express from 'express';
import { createDiscipline, getAllDisciplines } from '../controllers/disciplineController.js';

const router = express.Router();

router.post('/', createDiscipline);
router.get('/', getAllDisciplines);

export default router;