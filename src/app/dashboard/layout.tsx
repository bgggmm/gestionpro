import { Sidebar } from "@/components/layout/sidebar";

import { Navbar } from "@/components/layout/navbar";

import { TasksRealtime } from "@/components/realtime/tasks-realtime";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <TasksRealtime />

      <div className="flex">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar />

          <main className="relative flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}