import express from 'express';
import { createAffectation, getAllAffectations, deleteAffectation } from '../controllers/affectationController.js';

const router = express.Router();

router.post('/', createAffectation);
router.get('/', getAllAffectations);
router.delete('/:id', deleteAffectation);

export default router;