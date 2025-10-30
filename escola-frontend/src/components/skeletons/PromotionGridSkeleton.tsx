import { Skeleton } from "@/components/ui/skeleton";

type PromotionGridSkeletonProps = {
  count?: number;
};

export default function PromotionGridSkeleton({
  count = 4,
}: PromotionGridSkeletonProps) {
  const skeletonItems = Array.from({ length: count });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
      {skeletonItems.map((_, index) => (
        <div key={index} className="flex flex-col gap-0 rounded-xl w-[260px]">
          <div className="flex justify-end gap-2 mx-2">
            <Skeleton className="h-8 w-16 rounded-b-none" />
            <Skeleton className="h-8 w-20 rounded-b-none" />
          </div>

          <div className="w-[260px] h-[380px] flex flex-col rounded-xl overflow-hidden shadow-lg border-muted-light">
            <div className="flex-1">
              <Skeleton className="w-full h-full rounded-none animate-pulse bg-muted/40" />
            </div>

            <div className="bg-white p-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-3/4 animate-pulse bg-muted/40" />
              <Skeleton className="h-4 w-1/2 animate-pulse bg-muted/40" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
