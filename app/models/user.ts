import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  alf_num: {
    type: String,
    unique: true,
    required: [true, "Código alfanumérico es requerido"],
    maxLength: [10, "El código alfanumérico debe tener máximo 10 caracteres"],
  },
  dni: {
    type: String,
    unique: true,
    required: [true, "DNI es requerido"],
    minLength: [8, "El DNI debe tener 8 caracteres"],
    maxLength: [8, "El DNI debe tener 8 caracteres"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email es requerido"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Ingrese un email válido",
    ],
  },
  id_rol: {
    type: Number,
    required: [true, "Rol es requerido"],
    enum: {
      values: [1, 2, 3],
      message: "Rol no válido",
    },
  },
  password: {
    type: String,
    required: [true, "Contraseña es requerida"],
    select: false,
    minLength: [6, "La contraseña debe tener al menos 6 caracteres"],
  },
  telefono: {
    type: String,
    required: [true, "Teléfono es requerido"],
    minLength: [9, "El teléfono debe tener al menos 9 caracteres"],
    maxLength: [15, "El teléfono debe tener máximo 15 caracteres"],
  },
  user: {
    type: String,
    unique: true,
    required: [true, "Usuario es requerido"],
    minLength: [3, "El usuario debe tener al menos 3 caracteres"],
    maxLength: [20, "El usuario debe tener máximo 20 caracteres"],
  },
  user_firstname: {
    type: String,
    required: [true, "Nombre es requerido"],
    minLength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxLength: [50, "El nombre debe tener máximo 50 caracteres"],
  },
  user_lastname: {
    type: String,
    required: [true, "Apellido es requerido"],
    minLength: [3, "El apellido debe tener al menos 3 caracteres"],
    maxLength: [50, "El apellido debe tener máximo 50 caracteres"],
  },
});

const User = models.User || model("User", userSchema);

export default User;
