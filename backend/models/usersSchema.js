import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
      },
      prenom: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Veuillez fournir un email valide"],
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
    });

// export const Admin = mongoose.model('Admin Register', userSchema);
export const User = mongoose.model('User', userSchema);

