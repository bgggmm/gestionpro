import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <Skeleton className="h-10 w-52 rounded-xl" />

      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>

      <Skeleton className="h-72 rounded-2xl" />
    </div>
  );
}