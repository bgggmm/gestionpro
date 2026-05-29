import { createClient } from "@/lib/supabase/server";

import { KanbanBoard } from "@/components/tasks/kanban-board";

export default async function KanbanPage() {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Kanban Board
        </h1>

        <p className="text-muted-foreground">
          Organiza tareas visualmente
        </p>
      </div>

      <KanbanBoard tasks={tasks || []} />
    </div>
  );
}