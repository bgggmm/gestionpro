import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { ProfileForm } from "@/components/forms/profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return (
      <div className="rounded-2xl border p-8">
        Perfil no encontrado
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Perfil
        </h1>

        <p className="text-muted-foreground">
          Administra tu cuenta
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border p-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
          {profile.name?.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            {profile.name}
          </h2>

          <p className="text-muted-foreground">
            {profile.email}
          </p>
        </div>
      </div>

      <ProfileForm profile={profile} />
    </div>
  );
}