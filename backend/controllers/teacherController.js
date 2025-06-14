import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// Créer un professeur
export const createTeacher = async (req, res, next) => {
  try {
    const { 
      name, 
      cin, 
      type, 
      diplome, 
      specialite, 
      anciennete, 
      contrat, 
      tarifHoraire, 
      heuresMois 
    } = req.body;

    if (!name || !cin || !type || !diplome || !specialite) {
      return handleValidationError("Veuillez remplir tous les champs obligatoires", 400);
    }

    // Validation spécifique selon le type
    if (type === "permanent" && !contrat) {
      return handleValidationError("Le type de contrat est obligatoire pour les permanents", 400);
    }

    if (type === "vacataire" && (!tarifHoraire || !heuresMois)) {
      return handleValidationError("Le tarif horaire et les heures/mois sont obligatoires pour les vacataires", 400);
    }

    const teacher = await Teacher.create(req.body);

    res.status(201).json({
      success: true,
      message: "Professeur créé avec succès",
      teacher
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir tous les professeurs
export const getAllTeachers = async (req, res, next) => {
  try {
    const { type } = req.query;
    
    let query = {};
    if (type) query.type = type;

    const teachers = await Teacher.find(query);

    res.status(200).json({
      success: true,
      teachers
    });
  } catch (err) {
    next(err);
  }
};

// Obtenir un professeur par ID
export const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
      return handleValidationError("Professeur non trouvé", 404);
    }

    res.status(200).json({
      success: true,
      teacher
    });
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un professeur
export const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!teacher) {
      return handleValidationError("Professeur non trouvé", 404);
    }

    res.status(200).json({
      success: true,
      message: "Professeur mis à jour avec succès",
      teacher
    });
  } catch (err) {
    next(err);
  }
};

// Supprimer un professeur
export const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return handleValidationError("Professeur non trouvé", 404);
    }

    res.status(200).json({
      success: true,
      message: "Professeur supprimé avec succès"
    });
  } catch (err) {
    next(err);
  }
};

// Ajouter une absence
export const addAbsence = async (req, res, next) => {
  try {
    const { date, raison, justifiee } = req.body;

    if (!date || !raison) {
      return handleValidationError("La date et la raison sont obligatoires", 400);
    }

    const teacher = await Teacher.findByIdAndUpdate(
        req.params.id,
        { 
          $push: { 
            absences: { 
              date: date, 
              raison: raison, 
              justifiee: justifiee 
            } 
          } 
        },
        { new: true }
      );

    if (!teacher) {
      return handleValidationError("Professeur non trouvé", 404);
    }

    res.status(200).json({
      success: true,
      message: "Absence enregistrée avec succès",
      teacher
    });
  } catch (err) {
    next(err);
  }
};

// Mettre à jour les heures pour un vacataire
export const updateHours = async (req, res, next) => {
  try {
    const { heuresMois, tarifHoraire } = req.body;

    if (!heuresMois || !tarifHoraire) {
      return handleValidationError("Les heures et le tarif sont obligatoires", 400);
    }

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return handleValidationError("Professeur non trouvé", 404);
    }

    if (teacher.type !== "vacataire") {
      return handleValidationError("Cette action n'est valable que pour les vacataires", 400);
    }

    teacher.heuresMois = heuresMois;
    teacher.tarifHoraire = tarifHoraire;
    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Heures mises à jour avec succès",
      teacher
    });
  } catch (err) {
    next(err);
  }
};