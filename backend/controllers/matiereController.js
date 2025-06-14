import { Matiere } from '../models/MatiereSchema.js';

// Créer une matière
export const createMatiere = async (req, res, next) => {
  try {
    const { name } = req.body;
    
    const matiere = new Matiere({ name });
    await matiere.save();
    
    res.status(201).json(matiere);
  } catch (error) {
    next(error);
  }
};

// Récupérer toutes les matières
export const getAllMatieres = async (req, res, next) => {
  try {
    const matieres = await Matiere.find().sort('name');
    res.json(matieres);
  } catch (error) {
    next(error);
  }
};