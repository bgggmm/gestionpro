import { createClient } from "@/lib/supabase/server";

import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <NavbarClient
      name={profile?.name || "Usuario"}
      email={profile?.email || ""}
    />
  );
}