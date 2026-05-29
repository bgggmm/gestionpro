"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterValues,
} from "@/lib/validations/auth";

import { createClient } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

export default function RegisterPage() {
  const supabase = createClient();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterValues) {
  try {
    setLoading(true);

    const { data, error } =
      await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
          },
        },
      });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        name: values.name,
        email: values.email,
      });
    }

    toast.success("Cuenta creada");

    router.push("/dashboard");

    router.refresh();
  } catch (error) {
    toast.error("Algo salió mal "+error);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border p-8 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">
            Crear cuenta
          </h1>

          <p className="text-muted-foreground">
            Bienvenido a GestiónPro
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <Input
              placeholder="Nombre"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Creando..."
              : "Crear cuenta"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-primary"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}