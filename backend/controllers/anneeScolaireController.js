// controllers/anneeScolaireController.js
import AnneeScolaire from '../models/AnneeScolaireSchema.js';

export const createAnneeScolaire = async (req, res) => {
  try {
    const { libelle, dateDebut, dateFin } = req.body;

    // Désactiver toutes les autres années si isCurrent=true
    if (req.body.isCurrent) {
      await AnneeScolaire.updateMany({}, { $set: { isCurrent: false } });
    }

    const annee = new AnneeScolaire({
      libelle,
      dateDebut,
      dateFin,
      isCurrent: req.body.isCurrent || false
    });

    await annee.save();
    res.status(201).json(annee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getCurrentAnneeScolaire = async (req, res) => {
    try {
      const annee = await AnneeScolaire.findOne({ isCurrent: true });
      if (!annee) {
        return res.status(404).json({ message: 'Aucune année scolaire active trouvée' });
      }
      res.json(annee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };