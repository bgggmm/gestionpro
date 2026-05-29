import { createClient } from "@/lib/supabase/server";

import { TaskForm } from "@/components/forms/task-form";

import { TaskCard } from "@/components/shared/task-card";

export default async function TasksPage() {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tareas</h1>

        <p className="text-muted-foreground">Gestiona tus tareas</p>
      </div>

      <TaskForm />

      <div className="grid gap-4 md:grid-cols-2">
        {tasks?.length === 0 && (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <p className="text-muted-foreground">No tienes tareas todavía</p>
          </div>
        )}

        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
