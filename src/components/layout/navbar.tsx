import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { ThemeToggle } from "@/components/shared/theme-toggle";

import { LogoutButton } from "@/components/shared/logout-button";

import { MobileSidebar } from "./mobile-sidebar";

import { createClient } from "@/lib/supabase/server";

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
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <MobileSidebar />

        <h2 className="text-lg font-semibold">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>
                {profile?.name?.charAt(0) || "G"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <div className="p-3">
              <p className="font-medium">
                {profile?.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {profile?.email}
              </p>
            </div>

            <div className="p-2">
              <LogoutButton />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}