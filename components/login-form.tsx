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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        user: values.username,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        toast.error("Error de inicio de sesión", {
          description: res.error,
        });
        setIsSubmitting(false);
        return;
      }

      if (res?.ok) {
        toast.success("Inicio de sesión exitoso", {
          description: "Bienvenido al sistema de Mesa de Ayuda Virtual.",
        });
        router.push("/");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Ocurrió un error inesperado. Por favor, intente nuevamente.");
      toast.error("Error inesperado", {
        description: "Por favor, intente nuevamente.",
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese su nombre de usuario"
                  type="text"
                  autoComplete="username"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Contraseña</FormLabel>
                <Link
                  href="/recuperar-contrasena"
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                  className="h-10"
                  {...field}
                />
              </FormControl>
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
              Iniciando sesión...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar sesión
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
