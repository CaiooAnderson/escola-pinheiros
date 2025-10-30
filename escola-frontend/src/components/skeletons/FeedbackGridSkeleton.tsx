import { Skeleton } from "@/components/ui/skeleton";

type FeedbackGridSkeletonProps = {
  count?: number;
};

export const FeedbackGridSkeleton = ({
  count = 8,
}: FeedbackGridSkeletonProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col w-full max-w-xs">
          <div className="flex justify-end gap-2 mx-2">
            <Skeleton className="h-8 w-16 rounded rounded-b-none" />
            <Skeleton className="h-8 w-20 rounded rounded-b-none" />
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-white h-full flex flex-col items-center text-center animate-pulse border border-muted-light">
            <Skeleton className="w-20 h-20 mb-4 rounded-full bg-muted/40" />

            <Skeleton className="h-5 w-3/4 rounded mb-4" />

            <Skeleton className="h-6 w-32 rounded mb-4 bg-white bg-gradient-to-br from-secondary-light/60" />

            <div className="flex flex-col items-center w-full space-y-2">
              <Skeleton className="h-4 w-4/4 rounded bg-muted/40" />
              <Skeleton className="h-4 w-3/4 rounded bg-muted/40" />
              <Skeleton className="h-4 w-3/4 rounded bg-muted/40" />
              <Skeleton className="h-4 w-1/4 rounded bg-muted/40" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
