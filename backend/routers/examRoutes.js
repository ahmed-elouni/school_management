import express from 'express';
import {
  createExam,
  getExamsByEleve,
  getExamsByTrimestre, // Nouvelle fonction à importer
  getExamsByAnnee,    // Nouvelle fonction à importer
  getClassStats,
  updateNote
} from '../controllers/examController.js';

const router = express.Router();

// Créer un examen
router.post('/', createExam);

// Récupérer les examens d'un élève
router.get('/eleve/:eleveId', getExamsByEleve);

// Nouvelle route: Récupérer les examens par trimestre
router.get('/trimestre/:trimestreId', getExamsByTrimestre);

// Nouvelle route: Récupérer les examens par année scolaire
router.get('/annee/:anneeId', getExamsByAnnee);

// Statistiques de classe (maintenant utilisant trimestreId au lieu de numéro)
router.get('/stats', getClassStats); 

// Mettre à jour une note
router.put('/:examId/notes/:noteId', updateNote);

export default router;