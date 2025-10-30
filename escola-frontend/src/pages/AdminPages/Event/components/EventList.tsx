import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import EventItem from "./EventItem";
import { Event } from "./EventForm";
import { EventCategory } from "./EventForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventGridSkeleton from "@/components/skeletons/EventGridSkeleton";

interface EventListProps {
  events: Event[];
  loading?: boolean;
  categories: EventCategory[];
  onEditClick: (event: Event) => void;
  onDelete: (id: string) => void;
}

export default function EventList({
  events,
  categories,
  loading = false,
  onEditClick,
  onDelete,
}: EventListProps) {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  useEffect(() => {
    if (categories.length > 0) {
      setOpenAccordions(categories.map((cat) => cat.id));
    }
  }, [categories]);

  if (loading) {
    return <EventGridSkeleton categoryCount={2} itemsPerCategory={5} />;
  }

  return (
    <Accordion
      type="multiple"
      className="space-y-2"
      value={openAccordions}
      onValueChange={setOpenAccordions}
    >
      {categories.map((cat) => {
        const eventsInCategory = events
          .filter((a) => a.categories.some((c) => c.id === cat.id))
          .sort(
            (a, b) =>
              new Date(b.eventAt).getTime() - new Date(a.eventAt).getTime()
          );

        return (
          <AccordionItem key={cat.id} value={cat.id}>
            <AccordionTrigger className="text-lg font-semibold">
              {cat.name}
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              {eventsInCategory.length > 0 ? (
                <Carousel className="w-full relative">
                  <CarouselContent className="gap-4">
                    {eventsInCategory.map((a) => (
                      <CarouselItem
                        key={a.id}
                        className="snap-start w-[200px] flex-none"
                      >
                        <EventItem
                          event={a}
                          onEditClick={() => onEditClick(a)}
                          onDelete={() => onDelete(a.id)}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {eventsInCategory.length >= 1 && (
                    <>
                      <CarouselPrevious className="left-[0.5rem]" />
                      <CarouselNext className="right-[0.5rem]" />
                    </>
                  )}
                </Carousel>
              ) : (
                <p className="text-center text-muted-foreground">
                  Nenhum evento nesta categoria
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
