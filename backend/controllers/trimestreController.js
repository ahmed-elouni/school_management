// controllers/trimestreController.js
import Trimestre from '../models/TrimestreSchema.js';

export const createTrimestre = async (req, res) => {
  try {
    const { numero, nom, dateDebut, dateFin, anneeScolaire } = req.body;
    
    const trimestre = new Trimestre({
      numero,
      nom,
      dateDebut,
      dateFin,
      anneeScolaire
    });

    await trimestre.save();
    res.status(201).json(trimestre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getTrimestres = async (req, res) => {
  try {
    const trimestres = await Trimestre.find().sort({ dateDebut: 1 });
    res.json(trimestres);
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la récupération des trimestres",
      error: error.message 
    });
  }
};