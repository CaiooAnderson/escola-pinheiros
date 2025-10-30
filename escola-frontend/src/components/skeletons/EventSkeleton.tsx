import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimatedSection from "@/components/animations/AnimatedSection";

type EventSkeletonProps = {
  categoryCount?: number;
  itemsPerCategory?: number;
  showFilters?: boolean;
};

export const EventSkeleton = ({
  categoryCount = 2,
  itemsPerCategory = 8,
  showFilters = true,
}: EventSkeletonProps) => {
  const categories = Array.from({ length: categoryCount });
  const skeletonItems = Array.from({ length: itemsPerCategory });

  const openAccordions = categories.map((_, idx) => `category-${idx}`);

  return (
    <div className="container mx-auto">
      {showFilters && (
        <div className="flex sm:flex-row flex-col items-end justify-end mb-6 gap-4">
          <div className="w-45">
            <Skeleton className="h-10 w-full rounded-md bg-primary-dark/30" />
          </div>
          <div className="w-45">
            <Skeleton className="h-10 w-full rounded-md bg-primary-dark/30" />
          </div>
        </div>
      )}

      <Accordion type="multiple" className="space-y-6" value={openAccordions}>
        {categories.map((_, categoryIndex) => (
          <AccordionItem
            key={categoryIndex}
            value={`category-${categoryIndex}`}
          >
            <AccordionTrigger className="text-2xl font-semibold">
              <Skeleton className="h-8 w-48 bg-primary-dark/30" />
            </AccordionTrigger>

            <AccordionContent className="pt-4">
              <Carousel className="w-full relative">
                <CarouselContent className="gap-4">
                  {skeletonItems.map((_, itemIndex) => (
                    <AnimatedSection
                      key={itemIndex}
                      direction="up"
                      delay={itemIndex * 0.1}
                    >
                      <CarouselItem className="snap-start w-[150px] flex-none">
                        <div className="w-[150px] h-[150px] rounded-md overflow-hidden border border-muted-light shadow-lg animate-pulse">
                          <div className="w-full h-full bg-primary-dark/50 relative">
                            <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-2">
                              <Skeleton className="h-4 w-20 bg-white/30 " />
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    </AnimatedSection>
                  ))}
                </CarouselContent>

                {itemsPerCategory > 1 && (
                  <>
                    <CarouselPrevious className="left-[0.5rem]" />
                    <CarouselNext className="right-[0.5rem]" />
                  </>
                )}
              </Carousel>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export const EventSkeletonAdmin = () => (
  <div className="w-full bg-transparent py-0 px-2">
    <EventSkeleton categoryCount={2} itemsPerCategory={8} showFilters={false} />
  </div>
);
