import express from 'express';
import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
  getClassesByNiveau
} from '../controllers/classController.js';

const router = express.Router();
router.get('/by-level/:niveauId', getClassesByNiveau);
router.post('/', createClass);
router.get('/', getAllClasses);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;