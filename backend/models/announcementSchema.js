import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Le contenu est obligatoire'],
    trim: true
  },
  files: [{
    type: String
  }],
  createdBy: {
    type:  String ,
    default: 'anonymous'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances de recherche
//announcementSchema.index({ createdAt: -1 });
//announcementSchema.index({ createdBy: 1 });

export const Announcement = mongoose.model('Announcement', announcementSchema);