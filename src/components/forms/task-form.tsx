"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  taskSchema,
  TaskValues,
} from "@/lib/validations/task";

import { createClient } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

export function TaskForm() {
  const supabase = createClient();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      status: "pending",
    },
  });

  async function onSubmit(values: TaskValues) {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("tasks")
        .insert({
          title: values.title,
          description: values.description,
          status: values.status,
          user_id: user.id,
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Tarea creada");

      reset();

      router.refresh();
    } catch (error) {
      toast.error("Algo salió mal "+error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border p-6"
    >
      <div>
        <Input
          placeholder="Título"
          {...register("title")}
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Descripción"
          {...register("description")}
        />
      </div>

      <Button disabled={loading}>
        {loading
          ? "Creando..."
          : "Crear tarea"}
      </Button>
    </form>
  );
}