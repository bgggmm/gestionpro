import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold">
          404
        </h1>

        <p className="text-muted-foreground">
          Página no encontrada
        </p>
      </div>

      <Button asChild>
        <Link href="/dashboard">
          Volver
        </Link>
      </Button>
    </div>
  );
}