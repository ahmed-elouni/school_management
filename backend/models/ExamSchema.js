import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Eleve',
    required: true
  },
  trimestre: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trimestre', 
    required: true 
  },
  anneeScolaire: {
    type: mongoose.Schema.Types.ObjectId, // Modification clé ici
    ref: 'AnneeScolaire',
    required: true
  },
  notes: [{
    discipline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discipline',
      required: true
    },
    matiere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Matiere',
      required: true
    },
    note: {
      type: Number,
      required: true,
      min: 0,
      max: 20
    },
    coefficient: {
      type: Number,
      default: 1
    },
    appreciation: {
      type: String,
      trim: true
    }
  }],
  moyenneGenerale: {
    type: Number,
    min: 0,
    max: 20
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

examSchema.pre('save', function(next) {
  if (this.notes && this.notes.length > 0) {
    const totalPoints = this.notes.reduce((sum, note) => sum + (note.note * note.coefficient), 0);
    const totalCoefficients = this.notes.reduce((sum, note) => sum + note.coefficient, 0);
    this.moyenneGenerale = totalPoints / totalCoefficients;
  }
  next();
});

export const Exam = mongoose.model('Exam', examSchema);