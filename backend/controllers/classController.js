import { Class } from '../models/classSchema.js';
import { Niveau } from '../models/NiveauSchema.js';
export const createClass = async (req, res, next) => {
  try {
    const { name, niveau } = req.body;
    
    const newClass = new Class({
      name,
      niveau
    });

    await newClass.save();
    const populatedClass = await Class.findById(newClass._id).populate('niveau');
    
    res.status(201).json(populatedClass);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Cette classe existe déjà pour ce niveau' });
    }
    next(error);
  }
};

// Récupérer toutes les classes avec les niveaux
export const getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find().populate('niveau').sort('name');
    res.json(classes);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour une classe
export const updateClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, niveau } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, niveau },
      { new: true, runValidators: true }
    ).populate('niveau');

    if (!updatedClass) {
      return res.status(404).json({ message: 'Classe non trouvée' });
    }

    res.json(updatedClass);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Cette classe existe déjà pour ce niveau' });
    }
    next(error);
  }
};

// Supprimer une classe
export const deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: 'Classe non trouvée' });
    }

    res.json({ message: 'Classe supprimée avec succès' });
  } catch (error) {
    next(error);
  }
};