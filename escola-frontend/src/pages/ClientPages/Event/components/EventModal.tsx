import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageSkeleton } from "@/components/skeletons/ImageSkeleton";
import MarqueeEffect from "@/components/animations/MarqueeEffect";
import InfoModal from "./InfoModal";
import { Image, Info } from "lucide-react";

interface EventModalProps {
  event: {
    id: string;
    name: string;
    imageUrl: string;
    date: string;
    category: string;
    photosLink?: string;
    description?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({
  event,
  isOpen,
  onClose,
}: EventModalProps) {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  if (!event) return null;

  const handlePhotosClick = () => {
    if (event.photosLink) {
      window.open(event.photosLink, "_blank");
    } else {
      console.log("Nenhum link de fotos disponível para:", event.name);
    }
  };

  const handleInfoClick = () => {
    if (event.description) {
      setIsInfoModalOpen(true);
    } else {
      console.log("Nenhuma descrição disponível para:", event.name);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg rounded-xl p-6 shadow-primary-dark">
          <DialogHeader>
            <DialogTitle>
              <div className="line-clamp-1 leading-normal flex justify-center sm:justify-start">
                <MarqueeEffect className="sm:max-w-112 max-w-60">
                  {event.name}
                </MarqueeEffect>
              </div>
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground flex flex-col">
              <span>Categoria: {event.category}</span>
              <span>Data do evento: {event.date}</span>
            </DialogDescription>
          </DialogHeader>

          <ImageSkeleton
            src={event.imageUrl}
            alt={event.name}
            className="mt-4 mx-auto rounded-lg object-cover sm:w-100 sm:h-100 w-60 h-60"
          />

          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="default"
              className="font-bold gap-2 group"
              onClick={handlePhotosClick}
              disabled={!event.photosLink}
            >
              <Image className="w-4 h-4 group-hover:rotate-360 transition-all" />
              Ver Fotos
            </Button>

            <Button
              variant="secondary"
              className="font-bold gap-2 group"
              onClick={handleInfoClick}
              disabled={!event.description}
            >
              <Info className="w-4 h-4 group-hover:animate-bounce transition-all" />
              Sobre o Evento
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <InfoModal
        event={
          event.description
            ? { ...event, description: event.description }
            : null
        }
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
}
