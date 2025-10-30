import { Skeleton } from "@/components/ui/skeleton";

type FAQSkeletonProps = {
  count?: number;
};

export function FAQSkeleton({ count = 5 }: FAQSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg bg-white shadow-sm p-4 animate-pulse"
        >
          <Skeleton className="h-4 w-3/4 mb-0 rounded" />
        </div>
      ))}
    </div>
  );
}
