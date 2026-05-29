"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "./sidebar-links";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-background md:block">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-2xl font-bold">
          GestiónPro
        </h1>
      </div>

      <nav className="space-y-2 p-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-muted",
                pathname === link.href &&
                  "bg-primary text-primary-foreground"
              )}
            >
              <Icon className="h-5 w-5" />

              <span>{link.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}