import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom est obligatoire"]
  },
  cin: {
    type: String,
    required: [true, "Le CIN est obligatoire"],
    unique: true
  },
  type: {
    type: String,
    enum: ["permanent", "vacataire"],
    required: [true, "Le type est obligatoire"]
  },
  diplome: {
    type: String,
    required: [true, "Le diplôme est obligatoire"]
  },
  specialite: {
    type: String,
    required: [true, "La spécialité est obligatoire"]
  },
  // Champs spécifiques aux permanents
  anciennete: String,
  contrat: {
    type: String,
    enum: ["CDI", "CDD"]
  },
  // Champs spécifiques aux vacataires
  tarifHoraire: Number,
  heuresMois: Number,
  // Gestion des absences
  absences: [{
    date: Date,
    raison: String,
    justifiee: Boolean
  }]
}, { timestamps: true });

export const Teacher = mongoose.model("Teacher", teacherSchema);