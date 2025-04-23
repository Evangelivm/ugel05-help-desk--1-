import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcrypt";
import { connectDB } from "../../lib/db";
import { sendUserToMySQL } from "@/lib/connections";

export async function POST(request: Request) {
  try {
    // 1. Mostrar datos recibidos
    const requestData = await request.json();
    console.log("Datos recibidos:", {
      ...requestData,
      password: "******", // Ocultamos la contraseña por seguridad en los logs
    });

    // 2. Convertir id_rol a número si es string
    if (typeof requestData.id_rol === "string") {
      requestData.id_rol = parseInt(requestData.id_rol);
    }

    // 3. Validación básica
    if (!requestData.password || requestData.password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // 4. Conexión a DB
    await connectDB();
    console.log("MongoDB conectado");

    // 5. Verificar duplicados
    const userFoundByEmail = await User.findOne({ email: requestData.email });
    if (userFoundByEmail) {
      return NextResponse.json(
        { message: "El correo electrónico ya está registrado" },
        { status: 409 }
      );
    }

    const userFoundByUsername = await User.findOne({ user: requestData.user });
    if (userFoundByUsername) {
      return NextResponse.json(
        { message: "El nombre de usuario ya existe" },
        { status: 409 }
      );
    }

    // 6. Hash de contraseña
    const hashedPassword = await bcrypt.hash(requestData.password, 12);

    // 7. Crear usuario en MongoDB
    const newUser = new User({
      ...requestData,
      password: hashedPassword,
      id_rol: Number(requestData.id_rol), // Aseguramos que sea número
    });

    // 8. Guardar usuario en MongoDB
    const savedUser = await newUser.save();
    console.log("Usuario creado en MongoDB:", {
      ...savedUser.toObject(),
      password: "******",
    });

    // 9. Preparar datos para MySQL
    const mysqlUserData = {
      alf_num: requestData.alf_num,
      dni: requestData.dni,
      email: requestData.email,
      id_rol: Number(requestData.id_rol),
      celular: requestData.telefono,
      nombres: requestData.user_firstname,
      apellidos: requestData.user_lastname,
      activo: true,
    };

    console.log("Datos preparados para MySQL:", mysqlUserData);

    // 10. Enviar a MySQL
    const mysqlResult = await sendUserToMySQL(mysqlUserData);
    console.log("Resultado de MySQL:", mysqlResult);

    return NextResponse.json({
      mongoUser: savedUser,
      mysqlResult: mysqlResult,
    });
  } catch (error) {
    console.error("Error completo:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Error desconocido",
        errorDetails: error instanceof Error ? error.stack : null,
      },
      { status: 400 }
    );
  }
}
