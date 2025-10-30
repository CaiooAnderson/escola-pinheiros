import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimatedSection from "@/components/animations/AnimatedSection";

type PromotionSkeletonProps = {
  count?: number;
};

export default function PromotionSkeleton({
  count = 3,
}: PromotionSkeletonProps) {
  const skeletonItems = Array.from({ length: count });

  return (
    <Carousel className="w-full max-w-5xl relative">
      <CarouselContent>
        {skeletonItems.map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-full sm:basis-1/2 lg:basis-1/3 mb-4"
          >
            <AnimatedSection direction="up" delay={index * 0.2}>
              <div className="w-[260px] h-[380px] flex flex-col rounded-xl overflow-hidden shadow-lg mx-auto border-muted-light">
                <div className="flex-1 bg-muted/30">
                  <Skeleton className="w-full h-full rounded-none animate-pulse" />
                </div>

                <div className="bg-white p-3 flex flex-col gap-2">
                  <Skeleton className="h-4 w-3/4 animate-pulse" />
                  <Skeleton className="h-4 w-1/2 animate-pulse" />
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
}
