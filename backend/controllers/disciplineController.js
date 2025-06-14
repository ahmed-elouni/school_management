import { Discipline } from '../models/DisciplineSchema.js';
import { Matiere } from '../models/MatiereSchema.js';

// Créer une discipline
export const createDiscipline = async (req, res, next) => {
  try {
    const { matiereId, name } = req.body;
    
    // Vérifier si la matière existe
    const matiereExists = await Matiere.findById(matiereId);
    if (!matiereExists) {
      return res.status(404).json({ message: 'Matière non trouvée' });
    }
    
    const discipline = new Discipline({ matiereId, name });
    await discipline.save();
    
    // Populer les données pour la réponse
    const populatedDiscipline = await Discipline.findById(discipline._id).populate('matiereId', 'name');
    
    res.status(201).json({
      id: populatedDiscipline._id,
      matiere: populatedDiscipline.matiereId.name,
      nom: populatedDiscipline.name
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer toutes les disciplines
export const getAllDisciplines = async (req, res, next) => {
  try {
    const disciplines = await Discipline.find()
      .populate('matiereId', 'name')
      .sort('name');
    
    const formattedDisciplines = disciplines.map(d => ({
      id: d._id,
      matiere: d.matiereId.name,
      nom: d.name
    }));
    
    res.json(formattedDisciplines);
  } catch (error) {
    next(error);
  }
};