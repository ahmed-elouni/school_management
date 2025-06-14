// routes/anneeScolaireRoutes.js
import express from 'express';
import { 
  createAnneeScolaire, 
  getCurrentAnneeScolaire 
} from '../controllers/anneeScolaireController.js';

const router = express.Router();
router.post('/', createAnneeScolaire);
router.get('/current', getCurrentAnneeScolaire);
export default router;