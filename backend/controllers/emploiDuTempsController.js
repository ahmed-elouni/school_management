import { EmploiDuTemps } from '../models/EmploiDuTempsSchema.js';

// Créer un emploi du temps
export const createEmploiDuTemps = async (req, res, next) => {
  try {
    const { niveau, classe, anneeScolaire, cours } = req.body;
    
    const emploiDuTemps = new EmploiDuTemps({
      niveau,
      classe,
      anneeScolaire,
      cours
    });
    
    await emploiDuTemps.save();
    
    res.status(201).json(emploiDuTemps);
  } catch (error) {
    next(error);
  }
};

// Récupérer tous les emplois du temps
export const getAllEmploisDuTemps = async (req, res, next) => {
  try {
    const emplois = await EmploiDuTemps.find()
      .populate('niveau')
      .populate('classe')
      .populate('cours.salle')
      .populate('cours.professeur')
      .populate('cours.matiere')
      .sort('-createdAt');
      
    res.json(emplois);
  } catch (error) {
    next(error);
  }
};

// Récupérer un emploi du temps par ID
export const getEmploiDuTempsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const emploi = await EmploiDuTemps.findById(id)
      .populate('niveau')
      .populate('classe')
      .populate('cours.salle')
      .populate('cours.professeur')
      .populate('cours.matiere');
      
    if (!emploi) {
      return res.status(404).json({ message: 'Emploi du temps non trouvé' });
    }
    
    res.json(emploi);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour un emploi du temps
export const updateEmploiDuTemps = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { niveau, classe, anneeScolaire, cours } = req.body;
    
    const updatedEmploi = await EmploiDuTemps.findByIdAndUpdate(
      id,
      { niveau, classe, anneeScolaire, cours, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
    .populate('niveau')
    .populate('classe')
    .populate('cours.salle')
    .populate('cours.professeur')
    .populate('cours.matiere');
    
    if (!updatedEmploi) {
      return res.status(404).json({ message: 'Emploi du temps non trouvé' });
    }
    
    res.json(updatedEmploi);
  } catch (error) {
    next(error);
  }
};

// Supprimer un emploi du temps
export const deleteEmploiDuTemps = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deletedEmploi = await EmploiDuTemps.findByIdAndDelete(id);
    
    if (!deletedEmploi) {
      return res.status(404).json({ message: 'Emploi du temps non trouvé' });
    }
    
    res.json({ message: 'Emploi du temps supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};

// Récupérer les emplois du temps par classe
export const getEmploisByClasse = async (req, res, next) => {
  try {
    const { classeId } = req.params;
    
    const emplois = await EmploiDuTemps.find({ classe: classeId })
      .populate('niveau')
      .populate('classe')
      .populate('cours.salle')
      .populate('cours.professeur')
      .populate('cours.matiere')
      .sort('-createdAt');
      
    res.json(emplois);
  } catch (error) {
    next(error);
  }
};

// Récupérer le dernier emploi du temps pour une classe
export const getLatestEmploiForClasse = async (req, res, next) => {
  try {
    const { classeId } = req.params;
    
    const emploi = await EmploiDuTemps.findOne({ classe: classeId })
      .sort('-createdAt')
      .populate('niveau')
      .populate('classe')
      .populate('cours.salle')
      .populate('cours.professeur')
      .populate('cours.matiere');
      
    if (!emploi) {
      return res.status(404).json({ message: 'Aucun emploi du temps trouvé pour cette classe' });
    }
    
    res.json(emploi);
  } catch (error) {
    next(error);
  }
};