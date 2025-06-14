// models/TrimestreSchema.js
import mongoose from 'mongoose';

const trimestreSchema = new mongoose.Schema({
  numero: { 
    type: Number, 
    required: true,
    enum: [1, 2, 3, 4] // 4 = Annuel
  },
  nom: { 
    type: String, 
    required: true,
    enum: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Annuel'] 
  },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  anneeScolaire: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'AnneeScolaire', 
    required: true 
  } // Référence à l'année scolaire
});

const Trimestre = mongoose.model('Trimestre', trimestreSchema);
export default Trimestre; // Export par défaut
