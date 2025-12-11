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
import { Image, Info, Calendar, Tag } from "lucide-react";

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
    }
  };

  const handleInfoClick = () => {
    if (event.description) {
      setIsInfoModalOpen(true);
    }
  };

  const hasPhotosLink = Boolean(event.photosLink);
  const hasDescription = Boolean(event.description);
  const showButtons = hasPhotosLink || hasDescription;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg rounded-2xl p-6 shadow-primary-dark bg-background">
          <DialogHeader className="space-y-3">
            <div className="relative overflow-hidden">
              <DialogTitle className="text-center sm:text-left">
                <div className="flex justify-center sm:justify-start items-center gap-2">
                  <div className="relative overflow-hidden">
                    <MarqueeEffect className="text-2xl font-bold text-primary-dark font-primary">
                      {event.name}
                    </MarqueeEffect>
                    {event.name.length > 30 && (
                      <>
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                      </>
                    )}
                  </div>
                </div>
              </DialogTitle>
            </div>

            <div className="space-y-2.5 pt-2">
              <DialogDescription className="sr-only">
                Evento: {event.name}, Categoria: {event.category}, Data:{" "}
                {event.date}
              </DialogDescription>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">
                      Categoria:
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm">
                    {event.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">Data:</span>
                  </div>
                  <span className="text-foreground font-semibold">
                    {event.date}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <ImageSkeleton
              src={event.imageUrl}
              alt={event.name}
              className="relative mx-auto rounded-xl object-cover sm:w-100 sm:h-100 w-60 h-60 border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
            />
          </div>

          {showButtons && (
            <div
              className={`flex ${
                hasPhotosLink && hasDescription
                  ? "flex-col sm:flex-row justify-between"
                  : "justify-center"
              } gap-3 mt-8`}
            >
              {hasPhotosLink && (
                <Button
                  variant="default"
                  className={`font-bold gap-3 group px-6 py-6 sm:py-5 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl ${
                    hasPhotosLink && hasDescription
                      ? "w-full sm:w-auto"
                      : "w-full max-w-xs"
                  }`}
                  onClick={handlePhotosClick}
                >
                  <Image className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  <span className="group-hover:tracking-wide transition-all duration-300">
                    Ver Foto(s)
                  </span>
                </Button>
              )}

              {hasDescription && (
                <Button
                  variant="secondary"
                  className={`font-bold gap-3 group px-6 py-6 sm:py-5 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl ${
                    hasPhotosLink && hasDescription
                      ? "w-full sm:w-auto"
                      : "w-full max-w-xs"
                  }`}
                  onClick={handleInfoClick}
                >
                  <Info className="w-5 h-5 group-hover:animate-pulse transition-all duration-300" />
                  <span className="group-hover:tracking-wide transition-all duration-300">
                    Sobre o Evento
                  </span>
                </Button>
              )}
            </div>
          )}

          {!showButtons && (
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground italic">
                Este evento não possui informações adicionais disponíveis.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {hasDescription && (
        <InfoModal
          event={{ ...event, description: event.description! }}
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
        />
      )}
    </>
  );
}
