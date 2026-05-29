"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

interface Activity {
  id: string;

  title: string;

  status: string;
}

export function ActivityFeed() {
  const supabase = createClient();

  const [activities, setActivities] =
    useState<Activity[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(5);

      setActivities(data || []);
    }

    loadTasks();

    const channel = supabase
      .channel("activity-feed")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },

        async () => {
          await loadTasks();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="rounded-xl border p-4"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium">
              {activity.title}
            </p>

            <span className="text-sm text-muted-foreground capitalize">
              {activity.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}