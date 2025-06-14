// models/AnneeScolaireSchema.js
import mongoose from 'mongoose';

const anneeScolaireSchema = new mongoose.Schema({
  libelle: { 
    type: String, 
    required: true,
    unique: true,
    match: /^\d{4}-\d{4}$/ // Format "YYYY-YYYY"
  },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  isCurrent: { type: Boolean, default: false } // Pour marquer l'année active
});

const AnneeScolaire = mongoose.model('AnneeScolaire', anneeScolaireSchema);
export default AnneeScolaire; // Export par défaut