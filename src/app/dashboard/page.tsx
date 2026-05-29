import { createClient } from "@/lib/supabase/server";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*");

  const totalTasks = tasks?.length || 0;

  const completedTasks =
    tasks?.filter(
      (task) =>
        task.status === "completed"
    ).length || 0;

  const pendingTasks =
    tasks?.filter(
      (task) =>
        task.status === "pending"
    ).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Resumen general del sistema
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>
              Tareas Totales
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {totalTasks}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Completadas
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {completedTasks}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Pendientes
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {pendingTasks}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}