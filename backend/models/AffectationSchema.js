import mongoose from 'mongoose';

const affectationSchema = new mongoose.Schema({
  disciplineId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Discipline', 
    required: [true, 'L\'ID de la discipline est requis'] 
  },
  niveauId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Niveau', 
    required: [true, 'L\'ID du niveau est requis'] 
  },
  coefficient: { 
    type: Number, 
    required: [true, 'Le coefficient est requis'],
    min: [1, 'Le coefficient doit être au moins 1']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Affectation = mongoose.model('Affectation', affectationSchema);