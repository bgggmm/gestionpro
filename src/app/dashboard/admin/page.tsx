import { redirect } from "next/navigation";

import { getUserRole } from "@/lib/auth/get-user-role";

export default async function AdminPage() {
  const role = await getUserRole();

  if (role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Admin Panel
        </h1>

        <p className="text-muted-foreground">
          Área restringida para administradores
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <p>
          Bienvenido administrador 👑
        </p>
      </div>
    </div>
  );
}