import mongoose from 'mongoose';

const disciplineSchema = new mongoose.Schema({
  matiereId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Matiere', 
    required: [true, 'L\'ID de la matière est requis'] 
  },
  name: { 
    type: String, 
    required: [true, 'Le nom de la discipline est requis'],
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Discipline = mongoose.model('Discipline', disciplineSchema);