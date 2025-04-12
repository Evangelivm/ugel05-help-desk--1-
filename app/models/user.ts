import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  user: {
    type: String,
    required: [true, "Usuario es requerido"],
    unique: true,
    minLength: [2, "Usuario debe tener al menos 2 caracteres"],
    maxLength: [20, "Usuario debe tener máximo 20 caracteres"],
  },
  alf_num: {
    type: String,
    required: [true, "Código alfanumérico es requerido"],
    unique: true,
    length: [6, "Código alfanumérico debe tener 6 caracteres"],
  },
  user_firstname: {
    type: String,
    required: [true, "Nombre es requerido"],
    minLength: [2, "Nombre debe tener al menos 2 caracteres"],
    maxLength: [50, "Nombre debe tener máximo 50 caracteres"],
  },
  user_lastname: {
    type: String,
    required: [true, "Apellidos son requeridos"],
    minLength: [2, "Apellidos deben tener al menos 2 caracteres"],
    maxLength: [50, "Apellidos deben tener máximo 50 caracteres"],
  },
  email: {
    type: String,
    required: [true, "Email es requerido"],
    unique: true,
    match: [
      /^[\w-\.]+@ugel05\.gob\.pe$/,
      "Debe ser un correo electrónico de UGEL05",
    ],
  },
  password: {
    type: String,
    required: [true, "Contraseña es requerida"],
    select: false,
  },
  id_rol: {
    type: Number,
    required: [true, "Rol es requerido"],
    enum: [1, 2, 3], // 1: Usuario, 2: Técnico, 3: Administrador
  },
});

const User = models.User || model("User", userSchema);

export default User;
