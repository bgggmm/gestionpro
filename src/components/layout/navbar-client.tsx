"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { ThemeToggle } from "@/components/shared/theme-toggle";

import { LogoutButton } from "@/components/shared/logout-button";

import { MobileSidebar } from "./mobile-sidebar";

interface Props {
  name: string;
  email: string;
}

export function NavbarClient({
  name,
  email,
}: Props) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <MobileSidebar />

        <h2 className="text-lg font-semibold">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full outline-none">
              <Avatar>
                <AvatarFallback>
                  {name?.charAt(0) || "G"}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="z-9999 w-64 rounded-xl"
          >
            <div className="p-4">
              <p className="font-semibold">
                {name}
              </p>

              <p className="text-sm text-muted-foreground">
                {email}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                Perfil
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <div className="p-2">
              <LogoutButton />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}