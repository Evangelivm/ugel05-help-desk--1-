import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcrypt";
import { connectDB } from "../../lib/db";

export async function POST(request: Request) {
  try {
    const {
      user,
      alf_num,
      user_firstname,
      user_lastname,
      email,
      password,
      id_rol,
    } = await request.json();

    // Validaciones
    if (!password || password.length < 8) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }

    if (!email.endsWith("@ugel05.gob.pe")) {
      return NextResponse.json(
        { message: "Debe usar un correo electrónico de UGEL05" },
        { status: 400 }
      );
    }

    await connectDB();

    // Verificar si el usuario ya existe
    const userFound = await User.findOne({
      $or: [{ email }, { user }, { alf_num }],
    });

    if (userFound) {
      const field =
        userFound.email === email
          ? "correo electrónico"
          : userFound.user === user
          ? "nombre de usuario"
          : "código alfanumérico";

      return NextResponse.json(
        { message: `El ${field} ya está registrado` },
        { status: 409 }
      );
    }

    // Crear nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      user,
      alf_num,
      user_firstname,
      user_lastname,
      email,
      password: hashedPassword,
      id_rol,
    });

    const savedUser = await newUser.save();

    // Eliminar password del objeto de respuesta
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        message: "Usuario creado exitosamente",
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
