import { Event } from "../models/eventSchema.js";
import fs from 'fs';
import path from 'path';
export const createEvent = async (req, res, next) => {
  try {
    const { title, date, description, type, important } = req.body;
    const file = req.file;

    if (!title || !date || !description) {
      return res.status(400).json({
        success: false,
        message: "Titre, date et description sont obligatoires"
      });
    }

    let fileUrl = '';
    if (file) {
      fileUrl = `/uploads/events/${file.filename}`;
    }

    const event = await Event.create({
      title,
      date,
      description,
      type,
      important: important === 'true',
      fileUrl
    });

    res.status(201).json({
      success: true,
      event
    });
    
  } catch (err) {
    next(err);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      events
    });
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, date, description, type, important } = req.body;
    const file = req.file;

    let updateData = {
      title,
      date,
      description,
      type,
      important: important === 'true'
    };

    if (file) {
      updateData.fileUrl = `/uploads/events/${file.filename}`;
      
      // Supprimer l'ancien fichier s'il existe
      const oldEvent = await Event.findById(id);
      if (oldEvent.fileUrl) {
        const filePath = path.join(__dirname, '..', oldEvent.fileUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    const event = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Événement non trouvé"
      });
    }

    res.status(200).json({
      success: true,
      event
    });
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByIdAndDelete(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Événement non trouvé"
      });
    }

    // Supprimer le fichier associé s'il existe
    if (event.fileUrl) {
      const filePath = path.join(__dirname, '..', event.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({
      success: true,
      message: "Événement supprimé avec succès"
    });
  } catch (err) {
    next(err);
  }
};