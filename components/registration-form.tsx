"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z
  .object({
    user: z
      .string()
      .min(2, { message: "El usuario debe tener al menos 2 caracteres" }),
    user_firstname: z
      .string()
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    user_lastname: z
      .string()
      .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
    email: z
      .string()
      .min(1, { message: "El correo electrónico es requerido" })
      .email({ message: "Ingrese un correo electrónico válido" })
      .refine((email) => email.endsWith("@ugel05.gob.pe"), {
        message:
          "Debe utilizar un correo electrónico institucional (@ugel05.gob.pe)",
      }),
    dni: z.string().regex(/^\d{8}$/, {
      message: "El DNI debe tener exactamente 8 dígitossss",
    }),
    telefono: z.string().regex(/^\d{9}$/, {
      message: "El número de teléfono debe tener exactamente 9 dígitos",
    }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .regex(/[a-z]/, {
        message: "La contraseña debe contener al menos una letra minúscula",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe contener al menos un número",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Debe confirmar su contraseña" }),
    id_rol: z.number({
      required_error: "Seleccione su rol",
      invalid_type_error: "El rol debe ser un número",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const roles = [
  { value: 1, label: "Usuario" },
  { value: 2, label: "Técnico" },
  { value: 3, label: "Administrador" },
] as const;

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      user_firstname: "",
      user_lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      id_rol: 0,
      dni: "", // Valor inicial para dni
      telefono: "", // Valor inicial para telefono
    },
  });

  const generateAlfNum = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError("");

    try {
      const alf_num = generateAlfNum();

      const response = await axios.post("/api/auth/signup", {
        user: values.user,
        alf_num,
        user_firstname: values.user_firstname,
        user_lastname: values.user_lastname,
        email: values.email,
        password: values.password,
        id_rol: values.id_rol,
        telefono: values.telefono,
        dni: values.dni,
      });

      if (response.status === 201) {
        toast.success("Registro exitoso", {
          description: "Su cuenta ha sido creada exitosamente.",
          duration: 5000,
        });
        router.push("/login");
      }
    } catch (err: any) {
      console.error("Error en el registro:", err);
      setError(err.response?.data?.message || "Error al crear la cuenta");
      toast.error("Error de registro", {
        description:
          err.response?.data?.message || "Por favor, intente nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="usuario123" className="h-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="user_firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Juan" className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pérez García"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico institucional</FormLabel>
              <FormControl>
                <Input
                  placeholder="usuario@ugel05.gob.pe"
                  type="email"
                  autoComplete="email"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Debe utilizar su correo electrónico institucional
                (@ugel05.gob.pe)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas y
                  números
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DNI</FormLabel>
                <FormControl>
                  <Input
                    placeholder="12345678"
                    type="text"
                    maxLength={8}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    placeholder="987654321"
                    type="text"
                    maxLength={9}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="id_rol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccione su rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value.toString()}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white h-10"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando registro...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Registrarse
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
