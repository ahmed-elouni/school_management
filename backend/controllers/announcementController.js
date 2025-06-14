import { Announcement } from '../models/announcementSchema.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createAnnouncement = async (req, res, next) => {
  try {
    const { content, createdBy } = req.body; // Récupérez createdBy depuis le body

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Le contenu est obligatoire'
      });
    }

    let fileUrl = '';
    if (req.file) {
      fileUrl = `/uploads/announcements/${req.file.filename}`;
    }

    const announcement = await Announcement.create({
      content,
      files: fileUrl ? [fileUrl] : [],
      createdBy: createdBy || null // Devient optionnel
    });

    res.status(201).json({
      success: true,
      message: 'Annonce créée avec succès',
      announcement
    });

  } catch (error) {
    if (req.file) {
      const filePath = path.join(__dirname, '../public', `/uploads/announcements/${req.file.filename}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    next(error);
  }
};

export const updateAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Le contenu est obligatoire'
      });
    }

    const announcement = await Announcement.findById(id); // Suppression de la vérification createdBy
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Annonce non trouvée'
      });
    }

    let oldFileUrl = announcement.files.length > 0 ? announcement.files[0] : '';
    let newFileUrl = '';

    if (req.file) {
      newFileUrl = `/uploads/announcements/${req.file.filename}`;
      announcement.files = [newFileUrl];
    }

    announcement.content = content;
    const updatedAnnouncement = await announcement.save();

    if (req.file && oldFileUrl) {
      const oldFilePath = path.join(__dirname, '../public', oldFileUrl);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Annonce mise à jour avec succès',
      announcement: updatedAnnouncement
    });

  } catch (error) {
    if (req.file) {
      const newFilePath = path.join(__dirname, '../public', `/uploads/announcements/${req.file.filename}`);
      if (fs.existsSync(newFilePath)) {
        fs.unlinkSync(newFilePath);
      }
    }
    next(error);
  }
};

export const deleteAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndDelete(id); // Suppression de la vérification createdBy
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Annonce non trouvée'
      });
    }

    for (const fileUrl of announcement.files) {
      const filePath = path.join(__dirname, '../public', fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Annonce supprimée avec succès'
    });

  } catch (error) {
    next(error);
  }
};

export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: announcements.length,
      announcements
    });

  } catch (error) {
    next(error);
  }
};