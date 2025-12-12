import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageSkeleton } from "@/components/skeletons/ImageSkeleton";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { CarouselItem } from "@/components/ui/carousel";
import EventModal from "./EventModal";

interface EventCardProps {
  event: {
    id: string;
    name: string;
    imageUrl: string;
    date: string;
    category: string;
    photosLink?: string;
    description?: string;
  };
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AnimatedSection direction="up" delay={index * 0.1}>
        <CarouselItem className="snap-start w-37.5 flex-none">
          <Card
            className="cursor-pointer w-37.5 h-37.5 hover:scale-95"
            onClick={() => setIsModalOpen(true)}
          >
            <CardContent className="p-0 w-full h-full relative">
              <ImageSkeleton
                src={event.imageUrl}
                alt={event.name}
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-b from-black/70 from-60% to-card/20 flex items-start justify-center">
                <span className="text-white font-semibold text-center p-4 overflow-hidden text-ellipsis whitespace-nowrap">
                  {event.name}
                </span>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      </AnimatedSection>

      <EventModal
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
