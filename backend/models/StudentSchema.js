import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  photoIdentite: String,
  nom: { type: String, required: true, trim: true },
  prenom: { type: String, required: true, trim: true },
  matricule: { type: String, unique: true, trim: true },
  cne: { type: String, unique: true, trim: true },
  dateNaissance: { type: Date, required: true },
  lieuNaissance: { type: String, required: true, trim: true },
  
  // Parents
  parent1Nom: { type: String, required: true },
  parent1Prenom: { type: String, required: true },
  parent1Telephone: { type: String, required: true },
  
  // Affectation - Modification ici
  niveau: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Niveau',
    required: true 
  },
  classe: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Classe',
    required: true 
  },
  anneeScolaire: { type: String, default: "2024-2025" },
  
  // Autres champs
  adresse: { type: String, required: true },
  allergies: String,
  besoinsSpeciaux: String,
  fraisPayes: { type: Boolean, default: false }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true } 
});

// Validation d'âge
StudentSchema.pre('save', function(next) {
  const age = new Date().getFullYear() - this.dateNaissance.getFullYear();
  if (age < 6) {
    throw new Error("L'élève doit avoir au moins 6 ans");
  }
  next();
});

// Population automatique
StudentSchema.pre(/^find/, function(next) {
  this.populate('classe').populate('niveau');
  next();
});

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export { Student };