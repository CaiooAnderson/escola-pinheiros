import { Skeleton } from "@/components/ui/skeleton";

type FAQGridSkeletonProps = {
  count?: number;
};

export default function FAQGridSkeleton({ count = 5 }: FAQGridSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl max-w-3xl mx-auto flex flex-col gap-0"
        >
          <div className="flex justify-end mx-2 mt-2 gap-2">
            <Skeleton className="h-8 w-16 rounded-b-none" />
            <Skeleton className="h-8 w-20 rounded-b-none" />
          </div>

          <div className="rounded-lg bg-white shadow-sm p-4 animate-pulse border border-muted-light">
            <Skeleton className="h-4 w-3/4 mb-0 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
