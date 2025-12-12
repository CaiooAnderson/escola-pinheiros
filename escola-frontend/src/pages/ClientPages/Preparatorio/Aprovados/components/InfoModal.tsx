import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MarqueeEffect from "@/components/animations/MarqueeEffect";

interface InfoModalProps {
  approved: {
    id: string;
    name: string;
    description: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({
  approved,
  isOpen,
  onClose,
}: InfoModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTextHeight = () => {
      if (textRef.current && window.innerWidth < 768) {
        const lineHeight = 24;
        const maxHeight = lineHeight * 10;
        const textHeight = textRef.current.scrollHeight;

        setNeedsExpansion(textHeight > maxHeight);
      } else {
        setNeedsExpansion(false);
      }
    };

    checkTextHeight();
    window.addEventListener("resize", checkTextHeight);

    return () => {
      window.removeEventListener("resize", checkTextHeight);
    };
  }, [approved?.description]);

  if (!approved) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-2xl sm:max-w-xl max-w-sm max-h-[80vh] rounded-xl p-6 shadow-primary-dark flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-primary text-primary-dark text-center border-b pb-4">
            <MarqueeEffect>Depoimento - {approved.name}</MarqueeEffect>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4">
          <div
            ref={textRef}
            className={`text-lg font-secondary text-muted-dark leading-relaxed text-center whitespace-pre-line transition-all duration-300 ${
              !isExpanded && needsExpansion ? "line-clamp-10" : ""
            }`}
          >
            {approved.description}
          </div>

          {needsExpansion && (
            <div className="flex justify-center mt-4 md:hidden">
              <Button
                variant="link"
                className="p-0 h-auto shadow-none text-primary hover:text-primary-dark font-semibold"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Ler menos" : "Ler mais"}
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t mt-4">
          <Button
            onClick={onClose}
            variant="default"
            size="sm"
            className="font-semibold"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
