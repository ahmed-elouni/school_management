import mongoose from "mongoose";

const PerformanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classe',
    required: true
  },
  niveau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Niveau',
    required: true
  },
  anneeScolaire: {
    type: String,
    required: true,
    match: /^\d{4}-\d{4}$/ // Format: 2024-2025
  },
  trimestre: {
    type: Number,
    required: true,
    enum: [1, 2, 3]
  },
  disciplines: [{
    discipline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discipline',
      required: true
    },
    moyenne: {
      type: Number,
      min: 0,
      max: 20
    },
    matieres: [{
      matiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: true
      },
      note: {
        type: Number,
        min: 0,
        max: 20
      },
      coefficient: {
        type: Number,
        default: 1
      }
    }]
  }],
  moyenneGenerale: {
    type: Number,
    min: 0,
    max: 20
  },
  rang: Number,
  appreciation: String,
  evolution: {
    type: String,
    enum: ['up', 'down', 'stable']
  }
}, { timestamps: true });

// Calcul automatique des moyennes
PerformanceSchema.pre('save', function(next) {
  // Calcul moyenne générale
  let totalPoints = 0;
  let totalCoefficients = 0;

  this.disciplines.forEach(discipline => {
    let disciplinePoints = 0;
    let disciplineCoefficients = 0;

    discipline.matieres.forEach(matiere => {
      disciplinePoints += matiere.note * matiere.coefficient;
      disciplineCoefficients += matiere.coefficient;
    });

    discipline.moyenne = disciplinePoints / disciplineCoefficients;
    totalPoints += discipline.moyenne * disciplineCoefficients;
    totalCoefficients += disciplineCoefficients;
  });

  this.moyenneGenerale = totalPoints / totalCoefficients;
  next();
});

export const Performance = mongoose.model('Performance', PerformanceSchema);