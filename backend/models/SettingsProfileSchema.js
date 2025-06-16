import mongoose from 'mongoose';

const SettingsProfileSchema = new mongoose.Schema({
  // Personal Info
  profileImage: {
    type: String,
    default: '/default-profile.jpg', // Can be base64 or image URL
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  phone: {
    type: String,
    trim: true,
    default: '',
  },

  address: {
    type: String,
    trim: true,
    default: '',
  },
});

// Pre-save validation (example placeholder)
SettingsProfileSchema.pre('save', function (next) {
  if (!this.name || !this.email) {
    return next(new Error('Nom et email sont obligatoires.'));
  }
  next();
});
export const  SettingsProfile = mongoose.model('SettingsProfile',  SettingsProfileSchema);




