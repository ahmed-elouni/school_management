import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
  exportStudentPDF,
  getClassesByLevel,
  getLevels,
  exportPDF
} from '../controllers/StudentController.js';
import upload from '../middlewares/uploadMiddleware.js';
import { validateStudent } from '../validators/studentValidator.js';
import { validateObjectId } from '../middlewares/validateObjectId.js'; // Nouveau middleware
import mongoose from 'mongoose';

const router = express.Router();

// Routes principales
router.route('/')
  .post(
    upload.single('photoIdentite'), 
    validateStudent, 
    createStudent
  );

// Route de recherche (placée avant les routes paramétrées)
router.get('/search', searchStudents);

// Routes avec ID - Protégées par le middleware validateObjectId
router.route('/:id')
  .all(validateObjectId) // Validation appliquée à toutes les méthodes
  .get(getStudentById)
  .put(
    upload.single('photoIdentite'), 
    validateStudent, 
    updateStudent
  )
  .delete(deleteStudent);

router.route('/:id/export')
  .all(validateObjectId) // Validation appliquée ici aussi
  .get(exportStudentPDF);
router.get('/pdf/:id', exportStudentPDF);
router.get('/', getAllStudents);
////////
// Obtenir les niveaux disponibles
router.get("/by-level", getLevels);

// Obtenir les classes par niveau
router.get("/by-level/:niveau", getClassesByLevel);

// Rechercher les étudiants avec filtres
router.get("/search", searchStudents);

// Exporter en PDF
router.get("/export-pdf/:niveau/:classe", exportPDF);

export default router;