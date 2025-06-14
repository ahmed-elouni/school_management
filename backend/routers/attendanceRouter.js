import express from "express";
import { 
  markAttendance,
  getAttendanceByDateAndClass,
  getClassAttendanceSummary
} from "../controllers/attendanceController.js";

const router = express.Router();

// Enregistrer les présences
router.post('/', markAttendance);

// Récupérer les présences par date et classe
router.get('/', getAttendanceByDateAndClass);

// Récupérer le récapitulatif des présences pour une classe
router.get('/summary/:classId', getClassAttendanceSummary);

export default router;