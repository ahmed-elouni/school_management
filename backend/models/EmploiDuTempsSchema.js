import mongoose from 'mongoose';

const coursSchema = new mongoose.Schema({
  jour: { 
    type: String, 
    required: [true, 'Le jour est requis'],
    enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
  },
  heure: { 
    type: String, 
    required: [true, "L'heure est requise"]
  },
  duree: { 
    type: String, 
    required: [true, 'La durée est requise'],
    enum: ['1h', '1h30min', '2h']
  },
  salle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Salle',
    required: [true, 'La salle est requise']
  },
  professeur: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Teacher',
    required: [true, "L'enseignant est requis"]
  },
  matiere: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Matiere',
    required: [true, 'La matière est requise']
  }
});

const emploiDuTempsSchema = new mongoose.Schema({
  niveau: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Niveau',
    required: [true, 'Le niveau est requis']
  },
  classe: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Classe',
    required: [true, 'La classe est requise']
  },
  anneeScolaire: { 
    type: String, 
    required: [true, "L'année scolaire est requise"]
  },
  cours: [coursSchema],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Middleware pour mettre à jour la date de modification
emploiDuTempsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const EmploiDuTemps = mongoose.model('EmploiDuTemps', emploiDuTempsSchema);