// middlewares/validateObjectId.js
import mongoose from 'mongoose';
import { BadRequestError } from '../errors/customErrors.js'; // Optionnel - pour une meilleure gestion d'erreurs

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Version simple:
    return res.status(400).json({ 
      success: false,
      message: 'ID invalide - format incorrect'
    });
    
    // Ou avec gestion d'erreur personnalisée:
    throw new BadRequestError('ID invalide - format incorrect');
  }
  
  next();
};