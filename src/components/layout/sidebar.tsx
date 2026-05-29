import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },

  {
    href: "/dashboard/tasks",
    label: "Tareas",
  },

  {
    href: "/dashboard/profile",
    label: "Perfil",
  },
  {
    href: "/dashboard/kanban",
    label: "Kanban",
  },
];

export async function Sidebar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  return (
    <aside className="hidden w-72 border-r bg-background lg:block">
      <div className="p-6">
        <h1 className="text-2xl font-bold">GestiónPro</h1>
      </div>

      <nav className="space-y-2 px-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:translate-x-1 hover:bg-muted"
          >
            {route.label}
          </Link>
        ))}

        {profile?.role === "admin" && (
          <Link
            href="/dashboard/admin"
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:translate-x-1 hover:bg-muted"
          >
            Admin
          </Link>
        )}
      </nav>
    </aside>
  );
}
