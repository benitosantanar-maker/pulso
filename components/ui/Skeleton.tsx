import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

export function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <NewsCardSkeleton />
      <div className="flex flex-col gap-4">
        <NewsCardSkeleton />
        <NewsCardSkeleton />
      </div>
    </div>
  );
}
