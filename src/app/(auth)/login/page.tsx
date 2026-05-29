"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginValues,
} from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginValues) {
    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Bienvenido");

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
            GestiónPro
          </h1>

          <p className="text-muted-foreground">
            Inicia sesión
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
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
              ? "Ingresando..."
              : "Ingresar"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-primary"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}