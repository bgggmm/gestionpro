"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { sidebarLinks } from "./sidebar-links";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <div className="mt-8 space-y-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted"
              >
                <Icon className="h-5 w-5" />

                {link.title}
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
