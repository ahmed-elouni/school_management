import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Le titre est obligatoire"],
    trim: true
  },
  date: {
    type: Date,
    required: [true, "La date est obligatoire"]
  },
  description: {
    type: String,
    required: [true, "La description est obligatoire"]
  },
  type: {
    type: String,
    enum: ['general', 'meeting', 'exam', 'holiday'],
    default: 'general'
  },
  important: {
    type: Boolean,
    default: false
  },
  fileUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const Event = mongoose.model('Event', eventSchema);