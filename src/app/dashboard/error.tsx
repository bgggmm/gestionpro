"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Algo salió mal
        </h2>

        <p className="text-muted-foreground">
          {error.message}
        </p>
      </div>

      <Button onClick={() => reset()}>
        Reintentar
      </Button>
    </div>
  );
}