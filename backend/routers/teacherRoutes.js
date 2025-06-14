import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  addAbsence,
  updateHours
} from "../controllers/teacherController.js";

const router = express.Router();

// Routes CRUD de base
router.post("/", createTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

// Routes spécifiques
router.post("/:id/absences", addAbsence);
router.put("/:id/hours", updateHours);

export default router;