import express from 'express';
import {
  createEmploiDuTemps,
  getAllEmploisDuTemps,
  getEmploiDuTempsById,
  updateEmploiDuTemps,
  deleteEmploiDuTemps,
  getEmploisByClasse,
  getLatestEmploiForClasse
} from '../controllers/emploiDuTempsController.js';

const router = express.Router();

router.post('/', createEmploiDuTemps);
router.get('/', getAllEmploisDuTemps);
router.get('/:id', getEmploiDuTempsById);
router.put('/:id', updateEmploiDuTemps);
router.delete('/:id', deleteEmploiDuTemps);
router.get('/classe/:classeId', getEmploisByClasse);
router.get('/classe/:classeId/latest', getLatestEmploiForClasse);

export default router;