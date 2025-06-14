import { body, validationResult } from "express-validator";

export const validateTeacher = [
  body("name").notEmpty().withMessage("Le nom est obligatoire"),
  body("cin").notEmpty().withMessage("Le CIN est obligatoire"),
  body("type").isIn(["permanent", "vacataire"]).withMessage("Type invalide"),
  // Ajoutez d'autres validations selon vos besoins
];

// Utilisation dans les routes:
router.post("/", validateTeacher, createTeacher);