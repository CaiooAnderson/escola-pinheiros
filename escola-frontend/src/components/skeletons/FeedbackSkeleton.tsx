import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedSection from "@/components/animations/AnimatedSection";

type FeedbackSkeletonProps = {
  count?: number;
};

export const FeedbackSkeleton = ({ count = 3 }: FeedbackSkeletonProps) => {
  return (
    <Carousel className="w-full max-w-4xl relative">
      <CarouselContent>
        {Array.from({ length: count }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-full sm:basis-1/2 lg:basis-1/3 mb-4"
          >
            <AnimatedSection direction="up" delay={index * 0.15}>
              <div className="p-6 rounded-xl shadow-lg bg-white h-full flex flex-col items-center text-center mt-0 animate-pulse border border-muted-light">
                <Skeleton className="w-20 h-20 mb-4 rounded-full" />

                <Skeleton className="h-5 w-3/4 rounded mb-2" />

                <Skeleton className="h-4 w-1/2 rounded mb-4" />

                <div className="flex flex-col items-center w-full space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </div>

                <div className="flex gap-1 mt-4">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Skeleton key={starIndex} className="w-5 h-5 rounded" />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </CarouselItem>
        ))}
      </CarouselContent>

      {count > 1 && (
        <>
          <CarouselPrevious className="left-[0.5rem]" />
          <CarouselNext className="right-[0.5rem]" />
        </>
      )}
    </Carousel>
  );
};
