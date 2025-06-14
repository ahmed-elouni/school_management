// utils/initAnneesScolaires.js
import AnneeScolaire from '../models/AnneeScolaireSchema.js';

const annees = [
  {
    libelle: "2023-2024",
    dateDebut: new Date("2023-09-01"),
    dateFin: new Date("2024-06-30"),
    isCurrent: false
  },
  {
    libelle: "2024-2025",
    dateDebut: new Date("2024-09-01"),
    dateFin: new Date("2025-06-30"),
    isCurrent: true // Marquer comme année active
  }
];

await AnneeScolaire.insertMany(annees);