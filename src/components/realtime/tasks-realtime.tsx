"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

export function TasksRealtime() {
  const supabase = createClient();

  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("tasks-realtime")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },

        (payload) => {
          if (payload.eventType === "INSERT") {
            toast.success("Nueva tarea creada 🚀");
          }

          if (payload.eventType === "UPDATE") {
            toast.info("Tarea actualizada ✨");
          }

          if (payload.eventType === "DELETE") {
            toast.error("Tarea eliminada 🗑️");
          }

          router.refresh();
        },
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return null;
}
