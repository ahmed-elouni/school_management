import { Student } from '../models/StudentSchema.js';
import { Class } from '../models/classSchema.js';
import { Niveau } from '../models/NiveauSchema.js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const handleFileUpload = (file) => {
  if (!file) return null;
  const uploadDir = 'uploads/students';
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.originalname}`;
  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, file.buffer);
  return filepath;
};

const validateAge = (dateNaissance) => {
  const birthDate = new Date(dateNaissance);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 6;
};

export const createStudent = async (req, res, next) => {
  try {
    if (!validateAge(req.body.dateNaissance)) {
      return res.status(400).json({
        success: false,
        message: "L'élève doit avoir au moins 6 ans"
      });
    }

    const niveau = await Niveau.findById(req.body.niveau);
    if (!niveau) {
      return res.status(400).json({
        success: false,
        message: 'Niveau invalide'
      });
    }

    const classe = await Class.findOne({
      _id: req.body.classe,
      niveau: req.body.niveau
    });
    if (!classe) {
      return res.status(400).json({
        success: false,
        message: 'Classe invalide ou ne correspond pas au niveau sélectionné'
      });
    }

    const photoPath = req.file ? handleFileUpload(req.file) : null;
    const student = await Student.create({ 
      ...req.body,
      photoIdentite: photoPath,
      dateNaissance: new Date(req.body.dateNaissance)
    });

    const populatedStudent = await Student.findById(student._id)
      .populate('niveau')
      .populate('classe');

    res.status(201).json({ success: true, data: populatedStudent });
  } catch (err) {
    if (req.file?.path) fs.unlinkSync(req.file.path);
    console.error(err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, niveau, classe, search } = req.query;
    const filter = {};

    if (niveau) filter.niveau = niveau;
    if (classe) filter.classe = classe;
    if (search) {
      filter.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { prenom: { $regex: search, $options: 'i' } },
        { matricule: { $regex: search, $options: 'i' } }
      ];
    }

    const [students, total] = await Promise.all([
      Student.find(filter)
        .populate('niveau')
        .populate('classe')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit)),
      Student.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: students
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Format ID invalide' });
    }
    const student = await Student.findById(id).populate('niveau').populate('classe');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Élève non trouvé' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.dateNaissance && !validateAge(updates.dateNaissance)) {
      return res.status(400).json({
        success: false,
        message: "L'élève doit avoir au moins 6 ans"
      });
    }

    if (updates.niveau) {
      const niveau = await Niveau.findById(updates.niveau);
      if (!niveau) {
        return res.status(400).json({ success: false, message: 'Niveau invalide' });
      }
    }

    if (updates.classe) {
      const niveauId = updates.niveau || (await Student.findById(req.params.id)).niveau;
      const classe = await Class.findOne({ _id: updates.classe, niveau: niveauId });
      if (!classe) {
        return res.status(400).json({
          success: false,
          message: 'Classe invalide ou ne correspond pas au niveau'
        });
      }
    }

    if (req.file) {
      updates.photoIdentite = handleFileUpload(req.file);
      const oldStudent = await Student.findById(req.params.id);
      if (oldStudent?.photoIdentite) fs.unlinkSync(oldStudent.photoIdentite);
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    }).populate('niveau').populate('classe');

    if (!student) return res.status(404).json({ success: false, message: 'Élève non trouvé' });
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    if (req.file?.path) fs.unlinkSync(req.file.path);
    console.error(err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Élève non trouvé' });
    if (student.photoIdentite && fs.existsSync(student.photoIdentite)) fs.unlinkSync(student.photoIdentite);
    res.status(200).json({ success: true, message: 'Élève supprimé avec succès', data: { id: student._id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

export const searchStudents = async (req, res, next) => {
  try {
    const { q, niveau, classe } = req.query;
    const filter = {};
    if (niveau) filter.niveau = niveau;
    if (classe) filter.classe = classe;
    if (q) {
      filter.$or = [
        { nom: { $regex: q, $options: 'i' } },
        { prenom: { $regex: q, $options: 'i' } },
        { matricule: { $regex: q, $options: 'i' } }
      ];
    }
    const students = await Student.find(filter).populate('niveau').populate('classe').limit(50);
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};
export const exportStudentPDF = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('niveau')
      .populate('classe');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Élève non trouvé'
      });
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147);
    doc.text("Fiche Scolaire - École Gloire", 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom: ${student.nom}`, 20, 40);
    doc.text(`Prénom: ${student.prenom}`, 20, 50);
    doc.text(`Niveau: ${student.niveau?.name}`, 20, 60);
    doc.text(`Classe: ${student.classe?.nom}`, 20, 70);
    doc.text(`Matricule: ${student.matricule || 'Non défini'}`, 20, 80);

    autoTable(doc, {
      startY: 90,
      head: [['Type', 'Détails']],
      body: [
        ['Date de naissance', student.dateNaissance.toLocaleDateString()],
        ['Lieu de naissance', student.lieuNaissance],
        ['Père', `${student.parent1Nom} ${student.parent1Prenom}`],
        ['Téléphone père', student.parent1Telephone],
        ['Mère', `${student.parent2Nom || ''} ${student.parent2Prenom || ''}`],
        ['Téléphone mère', student.parent2Telephone || 'Non défini'],
        ['Adresse', student.adresse],
        ['Allergies', student.allergies || 'Aucune'],
        ['Besoins spéciaux', student.besoinsSpeciaux || 'Aucun']
      ],
      theme: 'grid',
      headStyles: { fillColor: [25, 118, 210] }
    });

    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Généré le ${date}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });

    const pdfData = doc.output();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=fiche_${student.nom}_${student.prenom}.pdf`);
    res.send(Buffer.from(pdfData, 'binary'));

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la génération du PDF',
      error: err.message
    });
  }
};
///////
import PDFDocument from "pdfkit";

// Obtenir les niveaux disponibles
export const getLevels = async (req, res) => {
    try {
    const levels = await Student.distinct("niveau");
    res.status(200).json({ data: levels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les étudiants selon le niveau (pour classes disponibles)
export const getClassesByLevel = async (req, res) => {
  try {
    const niveau = req.params.niveau;
    const students = await Student.find({ niveau });
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Exporter la liste des élèves en PDF
export const exportPDF = async (req, res) => {
  try {
    const { niveau, classe } = req.params;

    const students = await Student.find({ niveau, classe });

    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", `attachment; filename=eleves_${niveau}_${classe}.pdf`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(18).text(`Liste des élèves - ${niveau} ${classe}`, {
      align: "center"
    });

    doc.moveDown();
    doc.fontSize(12);

    students.forEach((student, index) => {
      const birthDate = new Date(student.dateNaissance);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      doc.text(
        `${index + 1}. ${student.prenom} ${student.nom} - Classe: ${student.classe} - Matricule: ${student.matricule} - Âge: ${age} ans`
      );
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
