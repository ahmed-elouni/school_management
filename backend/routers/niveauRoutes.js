import express from 'express';
import { getAllNiveaux, createNiveau } from '../controllers/niveauController.js';

const router = express.Router();

router.get('/', getAllNiveaux);
router.post('/', createNiveau);
export default router;