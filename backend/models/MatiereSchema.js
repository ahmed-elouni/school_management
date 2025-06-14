import mongoose from 'mongoose';

const matiereSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Le nom de la matière est requis'], 
    unique: true,
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Matiere = mongoose.model('Matiere', matiereSchema);