import { Affectation } from '../models/AffectationSchema.js';
import { Discipline } from '../models/DisciplineSchema.js';
import { Niveau } from '../models/NiveauSchema.js';

// Créer une affectation
export const createAffectation = async (req, res, next) => {
  try {
    const { disciplineId, niveauId, coefficient } = req.body;
    
    // Vérifier si la discipline existe
    const disciplineExists = await Discipline.findById(disciplineId);
    if (!disciplineExists) {
      return res.status(404).json({ message: 'Discipline non trouvée' });
    }
    
    // Vérifier si le niveau existe
    const niveauExists = await Niveau.findById(niveauId);
    if (!niveauExists) {
      return res.status(404).json({ message: 'Niveau non trouvé' });
    }
    
    const affectation = new Affectation({ disciplineId, niveauId, coefficient });
    await affectation.save();
    
    res.status(201).json(affectation);
  } catch (error) {
    next(error);
  }
};

// Récupérer toutes les affectations
export const getAllAffectations = async (req, res, next) => {
  try {
    const affectations = await Affectation.find()
      .populate('disciplineId', 'name')
      .populate('niveauId', 'name');
    
    const formattedAffectations = affectations.map(a => ({
      id: a._id,
      disciplineId: a.disciplineId._id,
      niveauId: a.niveauId._id,
      coefficient: a.coefficient,
      niveau: a.niveauId.name,
      discipline: a.disciplineId.name
    }));
    
    res.json(formattedAffectations);
  } catch (error) {
    next(error);
  }
};

// Supprimer une affectation
export const deleteAffectation = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const affectation = await Affectation.findByIdAndDelete(id);
    if (!affectation) {
      return res.status(404).json({ message: 'Affectation non trouvée' });
    }
    
    res.json({ message: 'Affectation supprimée avec succès' });
  } catch (error) {
    next(error);
  }
};