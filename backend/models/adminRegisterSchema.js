import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const adminRegisterSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "donnez un email validé"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

export const Admin = mongoose.model('Admin', adminRegisterSchema);
