import express from 'express';
import { createMatiere, getAllMatieres } from '../controllers/matiereController.js';

const router = express.Router();

router.post('/', createMatiere);
router.get('/', getAllMatieres);

export default router;