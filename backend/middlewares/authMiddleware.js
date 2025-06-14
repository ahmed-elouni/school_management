//import jwt from 'jsonwebtoken';
/*import { User } from '../models/usersSchema.js';
import asyncHandler from 'express-async-handler';

// Protection des routes - vérifie le token JWT
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Vérifier la présence du token dans les headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extraire le token du header
      token = req.headers.authorization.split(' ')[1];

      // 3. Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Récupérer l'utilisateur (sans le mot de passe)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Erreur de vérification du token:', error);
      res.status(401);
      throw new Error('Non autorisé - token invalide');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Non autorisé - aucun token fourni');
  }
});

// Middleware d'administration (doit être utilisé après protect)
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Accès interdit - droits administrateur requis');
  }
};

// Middleware pour vérifier la propriété (doit être utilisé après protect)
export const checkOwnership = (modelName) => 
  asyncHandler(async (req, res, next) => {
    const document = await mongoose.model(modelName).findById(req.params.id);
    
    if (!document) {
      res.status(404);
      throw new Error('Document non trouvé');
    }

    // Vérifie si l'utilisateur est admin OU le créateur
    if (req.user.role === 'admin' || document.createdBy.equals(req.user._id)) {
      next();
    } else {
      res.status(403);
      throw new Error('Action non autorisée');
    }
 });*/