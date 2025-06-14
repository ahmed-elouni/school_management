import { Exam } from '../models/ExamSchema.js';
import { Student } from '../models/StudentSchema.js';
import { Discipline } from '../models/DisciplineSchema.js';
import { Matiere } from '../models/MatiereSchema.js';
import AnneeScolaire from '../models/AnneeScolaireSchema.js';
import  Trimestre from '../models/TrimestreSchema.js'; // Nouvel import

// Créer un examen
export const createExam = async (req, res) => {
  try {
    const { eleve, trimestre, anneeScolaire, notes } = req.body;

    // Vérifier si l'élève existe
    const eleveExists = await Student.findById(eleve);
    if (!eleveExists) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }
 // 2. Vérifier si le trimestre existe
 const trimestreExists = await Trimestre.findById(trimestre);
 if (!trimestreExists) {
   return res.status(404).json({ message: 'Trimestre non trouvé' });
 }

 // 3. Vérifier si l'année scolaire existe
 const anneeExists = await AnneeScolaire.findById(anneeScolaire);
 if (!anneeExists) {
   return res.status(404).json({ message: 'Année scolaire non trouvée' });
 }
    // Vérifier les disciplines et matières
    for (const note of notes) {
      const disciplineExists = await Discipline.findById(note.discipline);
      const matiereExists = await Matiere.findById(note.matiere);
      
      if (!disciplineExists || !matiereExists) {
        return res.status(404).json({ 
          message: `Discipline ou matière non trouvée pour l'ID: ${note.discipline || note.matiere}`
        });
      }
    }

    const exam = new Exam({
      eleve,
      trimestre,
      anneeScolaire,
      notes
    });

    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer les examens d'un élève
export const getExamsByEleve = async (req, res) => {
  try {
    const { eleveId } = req.params;
    const exams = await Exam.find({ eleve: eleveId })
    .populate('eleve')
    .populate('trimestre')
    .populate('anneeScolaire')
    .populate('notes.discipline')
    .populate('notes.matiere');

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calculer les statistiques de classe
export const getClassStats = async (req, res) => {
  try {
    const { classeId, trimestreId, anneeScolaire } = req.query;

    // 1. Récupérer tous les élèves de la classe
    const eleves = await Student.find({ classe: classeId });

    // 2. Pour chaque élève, récupérer son examen pour le trimestre
    const exams = await Exam.find({
      eleve: { $in: eleves.map(e => e._id) },
      trimestre: trimestreId,
      anneeScolaire
    }).populate('eleve')
    .populate('trimestre');


    if (exams.length === 0) {
      return res.json({
        moyenneClasse: 0,
        moyenneParDiscipline: {},
        topEleves: [],
        bottomEleves: []
      });
    }

    // 3. Calculer la moyenne de la classe
    const moyenneClasse = exams.reduce((sum, exam) => sum + exam.moyenneGenerale, 0) / exams.length;

    // 4. Calculer les moyennes par discipline
    const moyenneParDiscipline = {};
    const disciplines = await Discipline.find();

    for (const discipline of disciplines) {
      const notesDiscipline = exams.flatMap(exam => 
        exam.notes.filter(n => n.discipline.equals(discipline._id))
      );

      if (notesDiscipline.length > 0) {
        const total = notesDiscipline.reduce((sum, note) => sum + note.note, 0);
        moyenneParDiscipline[discipline.name] = total / notesDiscipline.length;
      }
    }

    // 5. Identifier les meilleurs et moins bons élèves
    const sortedExams = [...exams].sort((a, b) => b.moyenneGenerale - a.moyenneGenerale);
    const topEleves = sortedExams.slice(0, 3).map(exam => ({
      eleve: exam.eleve.nom + ' ' + exam.eleve.prenom,
      moyenne: exam.moyenneGenerale
    }));
    const bottomEleves = sortedExams.slice(-3).map(exam => ({
      eleve: exam.eleve.nom + ' ' + exam.eleve.prenom,
      moyenne: exam.moyenneGenerale
    }));

    res.json({
      moyenneClasse,
      moyenneParDiscipline,
      topEleves,
      bottomEleves
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une note
export const updateNote = async (req, res) => {
  try {
    const { examId, noteId } = req.params;
    const updateData = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Examen non trouvé' });
    }

    const noteIndex = exam.notes.findIndex(n => n._id.equals(noteId));
    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Note non trouvée' });
    }

    exam.notes[noteIndex] = { ...exam.notes[noteIndex].toObject(), ...updateData };
    await exam.save();

    res.json(exam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getExamsByAnnee = async (req, res) => {
  try {
    const { anneeId } = req.params;
    
    const exams = await Exam.find({ anneeScolaire: anneeId })
      .populate('eleve')
      .populate('trimestre')
      .populate('anneeScolaire')
      .populate('notes.discipline')
      .populate('notes.matiere');

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/examController.js

// [...] (vos autres fonctions existantes)

// Nouvelle fonction pour récupérer les examens par trimestre
export const getExamsByTrimestre = async (req, res) => {
  try {
    const { trimestreId } = req.params;
    
    const exams = await Exam.find({ trimestre: trimestreId })
      .populate('eleve')
      .populate('trimestre')
      .populate('anneeScolaire')
      .populate('notes.discipline')
      .populate('notes.matiere');

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};