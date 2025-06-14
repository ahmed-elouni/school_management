import { Niveau } from '../models/NiveauSchema.js';

// Récupérer tous les niveaux
export const getAllNiveaux = async (req, res, next) => {
  try {
    const niveaux = await Niveau.find().sort({ createdAt: 1 });
    res.json(niveaux);
  } catch (error) {
    next(error);
  }
};
export const createNiveau = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Le nom du niveau est requis' });
    }

    // Vérifier s’il existe déjà
    const existing = await Niveau.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: 'Ce niveau existe déjà' });
    }

    const newNiveau = new Niveau({ name: name.trim() });
    await newNiveau.save();

    res.status(201).json({ niveau: newNiveau });
  } catch (error) {
    next(error);
  }
};