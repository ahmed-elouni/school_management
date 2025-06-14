import { handleValidationError } from "../middlewares/errorHandler.js";
import { Admin } from "../models/adminRegisterSchema.js";

export const adminSignIn = async (req, res, next) => {
  const { nom, prenom, email, password } = req.body;

  try {
    if (!nom || !prenom || !email || !password) {
      handleValidationError("Veuillez remplir tous les champs", 400);
    }

    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    // Vérifie aussi le nom et prénom en plus de l'email et mot de passe
    if (existingAdmin.nom !== nom || existingAdmin.prenom !== prenom) {
      return res.status(401).json({ success: false, message: "Nom ou prénom incorrect" });
    }

    // Vérification du mot de passe
    if (existingAdmin.password !== password) {
      return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    res.status(200).json({
      success: true,
      message: "Administrateur connecté avec succès",
      admin: {
        nom: existingAdmin.nom,
        prenom: existingAdmin.prenom,
        email: existingAdmin.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
