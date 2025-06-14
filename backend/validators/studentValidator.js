import { body } from 'express-validator';

export const validateStudent = [
  body('nom').notEmpty().withMessage('Le nom est obligatoire'),
  body('prenom').notEmpty().withMessage('Le prénom est obligatoire'),
  body('dateNaissance').isDate().withMessage('Date invalide'),
  body('niveau').isMongoId().withMessage('ID de niveau invalide'),
  body('classe').isMongoId().withMessage('ID de classe invalide')
];