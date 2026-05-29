"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  profileSchema,
  ProfileValues,
} from "@/lib/validations/profile";

import { createClient } from "@/lib/supabase/client";

import { toast } from "sonner";

import { Profile } from "@/types/profile";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

interface Props {
  profile: Profile;
}

export function ProfileForm({
  profile,
}: Props) {
  const supabase = createClient();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      name: profile.name,
      email: profile.email,
    },
  });

  async function onSubmit(
    values: ProfileValues
  ) {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          name: values.name,
          email: values.email,
        })
        .eq("id", profile.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Perfil actualizado");

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
      className="space-y-6 rounded-2xl border p-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Nombre
        </label>

        <Input {...register("name")} />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <Input {...register("email")} />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button disabled={loading}>
        {loading
          ? "Guardando..."
          : "Guardar cambios"}
      </Button>
    </form>
  );
}