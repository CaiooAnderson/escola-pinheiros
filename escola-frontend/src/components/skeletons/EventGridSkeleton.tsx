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
import { ImageSkeleton } from "./ImageSkeleton";

type EventGridSkeletonProps = {
  categoryCount?: number;
  itemsPerCategory?: number;
};

export default function EventGridSkeleton({
  categoryCount = 2,
  itemsPerCategory = 5,
}: EventGridSkeletonProps) {
  const categories = Array.from({ length: categoryCount });
  const skeletonItems = Array.from({ length: itemsPerCategory });

  const openAccordions = categories.map((_, idx) => `category-${idx}`);

  return (
    <Accordion type="multiple" className="space-y-2" value={openAccordions}>
      {categories.map((_, categoryIndex) => (
        <AccordionItem key={categoryIndex} value={`category-${categoryIndex}`}>
          <AccordionTrigger className="text-lg font-semibold">
            <Skeleton className="h-7 w-48 bg-muted/40" />
          </AccordionTrigger>
          <AccordionContent>
            <Carousel className="w-full relative mt-4">
              <CarouselContent className="gap-4">
                {skeletonItems.map((_, itemIndex) => (
                  <CarouselItem
                    key={itemIndex}
                    className="snap-start w-[200px] flex-none"
                  >
                    <div className="flex flex-col">
                      <div className="cursor-pointer border border-muted-light w-48 h-48 rounded-md overflow-hidden">
                        <div className="w-full h-full relative">
                          <ImageSkeleton
                            src={undefined}
                            alt="Carregando..."
                            className="w-full h-full object-cover rounded"
                          />
                          <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center p-2">
                            <Skeleton className="h-4 w-20 bg-white/30" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
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
  );
}
