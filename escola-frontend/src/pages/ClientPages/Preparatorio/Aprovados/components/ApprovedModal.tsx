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
import {
  ExternalLink,
  MessageCircle,
  GraduationCap,
  Calendar,
  Tag,
} from "lucide-react";

interface ApprovedModalProps {
  approved: {
    id: string;
    name: string;
    imageUrl: string;
    category: string;
    year: string;
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

  // Verificar quais botões devem ser exibidos
  const hasSocialLink = Boolean(approved.socialLink);
  const hasTestimony = Boolean(approved.testimony);
  const showButtons = hasSocialLink || hasTestimony;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg rounded-xl p-6 shadow-primary-dark">
          <DialogHeader>
            <DialogTitle>
              <div className="line-clamp-1 leading-normal flex justify-center sm:justify-start">
                <MarqueeEffect className="sm:max-w-112 max-w-60 text-primary">
                  {approved.name}
                </MarqueeEffect>
              </div>
            </DialogTitle>
            <DialogDescription className="space-y-2 pt-2">
              <div className="space-y-2.5 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">
                        Instituição:
                      </span>
                    </div>
                    <span className="text-foreground font-semibold">
                      {approved.institution}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">Ano:</span>
                    </div>
                    <span className="text-foreground font-semibold">
                      {approved.year}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">
                      Categoria:
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm">
                    {approved.category}
                  </span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <ImageSkeleton
            src={approved.imageUrl}
            alt={approved.name}
            className="mt-4 mx-auto rounded-lg object-cover sm:w-100 sm:h-100 w-60 h-60"
          />

          {showButtons && (
            <div
              className={`flex ${
                hasSocialLink && hasTestimony
                  ? "flex-col sm:flex-row justify-between"
                  : "justify-center"
              } gap-3 mt-4`}
            >
              {hasSocialLink && (
                <Button
                  variant="default"
                  className={`font-bold gap-2 group ${
                    hasSocialLink && hasTestimony
                      ? "w-full sm:w-auto"
                      : "w-full max-w-xs"
                  }`}
                  onClick={handleSocialClick}
                >
                  <ExternalLink className="w-5 h-5 group-hover:scale-110 group-hover:rotate-90 transition-transform" />
                  Redes Sociais
                </Button>
              )}

              {hasTestimony && (
                <Button
                  variant="secondary"
                  className={`font-bold gap-2 group ${
                    hasSocialLink && hasTestimony
                      ? "w-full sm:w-auto"
                      : "w-full max-w-xs"
                  }`}
                  onClick={handleTestimonyClick}
                >
                  <MessageCircle className="w-5 h-5 group-hover:animate-bounce transition-all" />
                  Depoimento
                </Button>
              )}
            </div>
          )}

          {!showButtons && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground italic">
                Este aprovado não possui informações adicionais disponíveis.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {hasTestimony && (
        <InfoModal
          approved={
            approved.testimony
              ? { ...approved, description: approved.testimony }
              : null
          }
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
        />
      )}
    </>
  );
}
