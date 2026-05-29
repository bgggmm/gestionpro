"use client";

import { createClient } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  const supabase = createClient();

  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/login");

    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
    >
      <LogOut className="h-4 w-4" />

      Cerrar sesión
    </button>
  );
}