import { Admin } from "../models/adminRegisterSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const adminRegister = async (req, res, next) => {
  console.log(req.body);
  const { nom, prenom, email, password } = req.body;

  try {
    if (!nom || !prenom || !email || !password) {
      return handleValidationError("Il faut remplir tous les champs!", 400);    }

    // Vérifier si l'administrateur existe déjà
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin déja existant" });
    }

    await Admin.create({ nom, prenom, email, password });

    res.status(201).json({
      success: true,
      message: "Admin Crée avec succés !",
    });
  } catch (err) {
    next(err);
  }
};
