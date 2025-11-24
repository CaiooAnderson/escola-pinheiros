import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageSkeleton } from "@/components/skeletons/ImageSkeleton";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { CarouselItem } from "@/components/ui/carousel";
import ApprovedModal from "./ApprovedModal";

interface ApprovedCardProps {
  approved: {
    id: string;
    name: string;
    imageUrl: string;
    category: string;
    year: string;
    position: string;
    institution: string;
    testimony?: string;
    socialLink?: string;
  };
  index: number;
}

export default function ApprovedCard({ approved, index }: ApprovedCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AnimatedSection direction="up" delay={index * 0.1}>
        <CarouselItem className="snap-start w-37.5 flex-none">
          <Card
            className="cursor-pointer w-37.5 h-37.5 hover:shadow-lg transition-shadow duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <CardContent className="p-0 w-full h-full relative">
              <ImageSkeleton
                src={approved.imageUrl}
                alt={approved.name}
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-3">
                <span className="text-white font-bold text-center text-sm mb-1">
                  {approved.name}
                </span>
                <span className="text-primary text-xs font-semibold bg-white/90 px-2 py-1 rounded-full">
                  {approved.position} lugar - {approved.institution}
                </span>
                <span className="text-white text-xs mt-1">{approved.year}</span>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      </AnimatedSection>

      <ApprovedModal
        approved={approved}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
