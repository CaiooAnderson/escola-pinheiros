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
import { ExternalLink, Info, Award } from "lucide-react";

interface ApprovedModalProps {
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
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApprovedModal({
  approved,
  isOpen,
  onClose,
}: ApprovedModalProps) {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  if (!approved) return null;

  const handleSocialClick = () => {
    if (approved.socialLink) {
      window.open(approved.socialLink, "_blank");
    }
  };

  const handleTestimonyClick = () => {
    if (approved.testimony) {
      setIsInfoModalOpen(true);
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
                  {approved.name}
                </MarqueeEffect>
              </div>
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>
                  {approved.position} lugar - {approved.institution}
                </span>
              </div>
              <span>Ano: {approved.year}</span>
              <span>Categoria: {approved.category}</span>
            </DialogDescription>
          </DialogHeader>

          <ImageSkeleton
            src={approved.imageUrl}
            alt={approved.name}
            className="mt-4 mx-auto rounded-lg object-cover sm:w-100 sm:h-100 w-60 h-60"
          />

          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="default"
              className="font-bold gap-2 group"
              onClick={handleSocialClick}
              disabled={!approved.socialLink}
            >
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Redes Sociais
            </Button>

            <Button
              variant="secondary"
              className="font-bold gap-2 group"
              onClick={handleTestimonyClick}
              disabled={!approved.testimony}
            >
              <Info className="w-4 h-4 group-hover:animate-bounce transition-all" />
              Depoimento
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <InfoModal
        approved={
          approved.testimony
            ? { ...approved, description: approved.testimony }
            : null
        }
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
}
