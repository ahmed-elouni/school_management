import mongoose from 'mongoose';

const niveauSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Le nom du niveau est requis'], 
    unique: true,
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Niveau = mongoose.model('Niveau', niveauSchema);