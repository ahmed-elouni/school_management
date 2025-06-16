import { SettingsProfile } from "../models/SettingsProfileSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";



////
export const getAdminProfile = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email requis' });
  }

  try {
    const profile = await SettingsProfile.findOne({ email });
    if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
    res.status(200).json(profile);
  } catch (err) {

    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

export const createAdminProfile = async (req, res) => {
  const { name, email, phone, address, profileImage } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Le nom et l\'email sont requis.' });
  }

  try {
    const existing = await SettingsProfile.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Profil déjà existant' });

    const profile = await SettingsProfile.create({ name, email, phone, address, profileImage });
    return res.status(201).json(profile);
  } catch (err) {
    console.log('Request ****** body:', req.body);
    console.error('Create profile error:', err);
    return res.status(500).json({ message: 'Erreur lors de la création', error: err.message });
  }
};


export const updateAdminProfile = async (req, res) => {
  try {
    const updated = await SettingsProfile.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Profil non trouvé' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur de mise à jour', error: err.message });
  }
};
////

/*
export const getAdminProfile = async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ message: 'Email requis' });

  try {
    const admin = await SettingsProfile.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin introuvable' });

    res.status(200).json(admin);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur serveur' });
    
  }
};

export const updateAdminProfile = async (req, res) => {
  const { name, email, phone, address, profileImage } = req.body;

  if (!email) 
    {
        return handleValidationError("Il faut remplir tous les champs!", 400);
        //return res.status(400).json({ message: 'Email requis' });
    }

  try {
    let admin = await SettingsProfile.findOne({ email });

    if (!admin) {
      admin = new SettingsProfile({ name, email, phone, address, profileImage });
    } else {
      admin.name = name;
      admin.phone = phone;
      admin.address = address;
      admin.profileImage = profileImage;
    }

    const savedAdmin = await admin.save();
    res.status(200).json(savedAdmin);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createAdminProfile = async (req, res) => {
  const { name, email, phone, address, profileImage } = req.body;

  if (!name || !email || !phone || !address) {
    return handleValidationError("Tous les champs sont requis pour créer un profil!", 400);
  }

  try {
    const existingAdmin = await SettingsProfile.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ message: "Un profil avec cet email existe déjà." });
    }

    const newAdmin = new SettingsProfile({ name, email, phone, address, profileImage });
    const savedAdmin = await newAdmin.save();

    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error('Erreur lors de la création du profil:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
*/