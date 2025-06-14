import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Le nom de la classe est requis'],
    trim: true
  },
  niveau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Niveau',
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Empêcher la duplication d'une classe dans le même niveau
classSchema.index({ name: 1, niveau: 1 }, { unique: true });

export const Class = mongoose.model('Classe', classSchema);

