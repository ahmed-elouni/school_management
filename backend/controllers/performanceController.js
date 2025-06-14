import { Performance } from '../models/PerformanceSchema.js';
import { Student } from '../models/StudentSchema.js';
import { Class } from '../models/classSchema.js';
import { Discipline } from '../models/DisciplineSchema.js';
import { Matiere } from '../models/MatiereSchema.js';
import  Trimestre  from '../models/TrimestreSchema.js';

// Statistiques globales de l'école
export const getSchoolPerformance = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const anneeScolaire = `${currentYear}-${currentYear + 1}`;

    // 1. Calculer la moyenne générale de l'école
    const performances = await Performance.find({ anneeScolaire });
    const totalStudents = await Student.countDocuments();
    
    if (performances.length === 0) {
      return res.json({
        averageScore: 0,
        totalStudents,
        passRate: 0,
        topClass: null
      });
    }

    const totalMoyenne = performances.reduce((sum, perf) => sum + perf.moyenneGenerale, 0);
    const averageScore = totalMoyenne / performances.length;

    // 2. Calculer le taux de réussite (moyenne >= 10)
    const passedStudents = performances.filter(p => p.moyenneGenerale >= 10).length;
    const passRate = (passedStudents / performances.length) * 100;

    // 3. Trouver la meilleure classe
    const classStats = await Performance.aggregate([
      { $match: { anneeScolaire } },
      { $group: { 
        _id: "$classe", 
        average: { $avg: "$moyenneGenerale" },
        count: { $sum: 1 }
      }},
      { $sort: { average: -1 } },
      { $limit: 1 }
    ]);

    const topClass = classStats.length > 0 
      ? await Class.findById(classStats[0]._id).select('name') 
      : null;

    res.json({
      averageScore,
      totalStudents,
      passRate,
      topClass: topClass?.name || null
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Performance par classe
export const getClassPerformance = async (req, res) => {
  try {
    const { classId } = req.params;
    const { term } = req.query;

    // 1. Vérifier que le trimestre existe
    const trimestre = await Trimestre.findById(term);
    if (!trimestre) {
      return res.status(404).json({ message: 'Trimestre non trouvé' });
    }

    // 2. Vérifier que la classe existe
    const classe = await Class.findById(classId);
    if (!classe) {
      return res.status(404).json({ message: 'Classe non trouvée' });
    }

    // 3. Récupérer tous les élèves de la classe
    const students = await Student.find({ classe: classId });

    // 4. Récupérer les performances pour le trimestre
    const performances = await Performance.find({
      student: { $in: students.map(s => s._id) },
      trimestre: term // Utilisation de l'ID du trimestre au lieu du numéro
    })
    .populate('student', 'nom prenom')
    .populate('disciplines.discipline', 'name')
    .sort({ moyenneGenerale: -1 });

    // 5. Ajouter le rang à chaque performance
    const performancesWithRank = performances.map((perf, index) => ({
      ...perf.toObject(),
      rank: index + 1,
      termName: trimestre.nom // Ajout du nom du trimestre
    }));

    res.json({
      students: performancesWithRank,
      classAverage: performances.reduce((sum, p) => sum + p.moyenneGenerale, 0) / performances.length,
      termInfo: {
        name: trimestre.nom,
        dates: `${trimestre.dateDebut.toISOString().split('T')[0]} - ${trimestre.dateFin.toISOString().split('T')[0]}`
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Performance par discipline
export const getDisciplinePerformance = async (req, res) => {
  try {
    const { classId } = req.params;
    const { term } = req.query;

    // 1. Vérifier que le trimestre existe
    const trimestre = await Trimestre.findById(term);
    if (!trimestre) {
      return res.status(404).json({ message: 'Trimestre non trouvé' });
    }

    // 2. Récupérer tous les élèves de la classe
    const students = await Student.find({ classe: classId });

    // 3. Récupérer les performances
    const performances = await Performance.find({
      student: { $in: students.map(s => s._id) },
      trimestre: term // Utilisation de l'ID du trimestre
    })
    .populate('disciplines.discipline', 'name');

    if (performances.length === 0) {
      return res.json({ 
        disciplines: [],
        termInfo: {
          name: trimestre.nom,
          dates: `${trimestre.dateDebut.toISOString().split('T')[0]} - ${trimestre.dateFin.toISOString().split('T')[0]}`
        }
      });
    }

    // 4. Calculer les stats par discipline
    const disciplines = await Discipline.find();
    const disciplineStats = [];

    for (const discipline of disciplines) {
      const disciplinePerfs = performances.flatMap(p => 
        p.disciplines.filter(d => d.discipline.equals(discipline._id))
      );

      if (disciplinePerfs.length > 0) {
        const average = disciplinePerfs.reduce((sum, d) => sum + d.moyenne, 0) / disciplinePerfs.length;
        const passRate = (disciplinePerfs.filter(d => d.moyenne >= 10).length / disciplinePerfs.length) * 100;

        disciplineStats.push({
          id: discipline._id,
          name: discipline.name,
          averageScore: average,
          passRate: passRate
        });
      }
    }

    res.json({ 
      disciplines: disciplineStats,
      termInfo: {
        name: trimestre.nom,
        dates: `${trimestre.dateDebut.toISOString().split('T')[0]} - ${trimestre.dateFin.toISOString().split('T')[0]}`
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Performance par matière
export const getSubjectPerformance = async (req, res) => {
  try {
    const { classId } = req.params;
    const { term } = req.query;

    // 1. Vérifier que le trimestre existe
    const trimestre = await Trimestre.findById(term);
    if (!trimestre) {
      return res.status(404).json({ message: 'Trimestre non trouvé' });
    }

    // 2. Récupérer tous les élèves de la classe
    const students = await Student.find({ classe: classId });

    // 3. Récupérer les performances
    const performances = await Performance.find({
      student: { $in: students.map(s => s._id) },
      trimestre: term // Utilisation de l'ID du trimestre
    })
    .populate('disciplines.matieres.matiere', 'name');

    if (performances.length === 0) {
      return res.json({ 
        subjects: [],
        termInfo: {
          name: trimestre.nom,
          dates: `${trimestre.dateDebut.toISOString().split('T')[0]} - ${trimestre.dateFin.toISOString().split('T')[0]}`
        }
      });
    }

    // 4. Calculer les stats par matière
    const matieres = await Matiere.find();
    const subjectStats = [];

    for (const matiere of matieres) {
      const matiereNotes = performances.flatMap(p => 
        p.disciplines.flatMap(d => 
          d.matieres.filter(m => m.matiere.equals(matiere._id))
        )
      );

      if (matiereNotes.length > 0) {
        const average = matiereNotes.reduce((sum, m) => sum + m.note, 0) / matiereNotes.length;
        const passRate = (matiereNotes.filter(m => m.note >= 10).length / matiereNotes.length) * 100;

        subjectStats.push({
          id: matiere._id,
          name: matiere.name,
          averageScore: average,
          passRate: passRate
        });
      }
    }

    res.json({ 
      subjects: subjectStats,
      termInfo: {
        name: trimestre.nom,
        dates: `${trimestre.dateDebut.toISOString().split('T')[0]} - ${trimestre.dateFin.toISOString().split('T')[0]}`
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une performance
export const updatePerformance = async (req, res) => {
  try {
    const { performanceId } = req.params;
    const updateData = req.body;

    const performance = await Performance.findByIdAndUpdate(
      performanceId,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('student', 'nom prenom')
    .populate('disciplines.discipline', 'name')
    .populate('disciplines.matieres.matiere', 'name')
    .populate('trimestre', 'nom dateDebut dateFin');

    if (!performance) {
      return res.status(404).json({ message: 'Performance non trouvée' });
    }

    res.json(performance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};