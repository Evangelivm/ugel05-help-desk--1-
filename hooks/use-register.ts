import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Función para generar un alfanumérico de 6 dígitos
  const generateAlfNum = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleRegister = async (values: {
    user: string;
    user_firstname: string;
    user_lastname: string;
    email: string;
    password: string;
    id_rol: string;
  }) => {
    setIsSubmitting(true);
    setError("");

    try {
      // Generar el alfanumérico
      const alf_num = generateAlfNum();

      // Enviar los datos al backend
      const res = await axios.post("/api/auth/signup", {
        user: values.user,
        user_firstname: values.user_firstname,
        user_lastname: values.user_lastname,
        email: values.email,
        password: values.password,
        id_rol: values.id_rol,
        alf_num,
      });

      console.log("Registro exitoso:", res);
      router.push("/login");
    } catch (err) {
      console.error("Error en el registro:", err);
      setError("Ocurrió un error durante el registro. Intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleRegister, isSubmitting, error };
}
