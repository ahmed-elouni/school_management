import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "La date est obligatoire"],
    default: Date.now
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: [true, "La classe est obligatoire"]
  },
  records: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'excused'],
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index pour éviter les doublons
attendanceSchema.index({ date: 1, class: 1 }, { unique: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);