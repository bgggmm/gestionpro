"use client";

import { Task } from "@/types/task";

import { createClient } from "@/lib/supabase/client";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface Props {
  task: Task;
}

export function TaskCard({ task }: Props) {
  const supabase = createClient();

  const router = useRouter();

  async function deleteTask() {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Tarea eliminada");

    router.refresh();
  }

  async function toggleStatus() {
    const { error } = await supabase
      .from("tasks")
      .update({
        status:
          task.status === "pending"
            ? "completed"
            : "pending",
      })
      .eq("id", task.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Estado actualizado");

    router.refresh();
  }

  return (
    <div className="space-y-4 rounded-2xl border p-5">
      <div>
        <h3 className="text-xl font-semibold">
          {task.title}
        </h3>

        <p className="text-muted-foreground">
          {task.description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant={
            task.status === "completed"
              ? "default"
              : "secondary"
          }
          onClick={toggleStatus}
        >
          {task.status}
        </Button>

        <Button
          variant="destructive"
          onClick={deleteTask}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}