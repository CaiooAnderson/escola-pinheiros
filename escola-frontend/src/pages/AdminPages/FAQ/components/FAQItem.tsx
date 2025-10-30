import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FAQ } from "./FAQForm";
import MarqueeEffect from "@/components/animations/MarqueeEffect";

interface FAQItemProps {
  faq: FAQ;
  onEdit: () => void;
  onDelete: () => void;
}

export default function FAQItem({ faq, onEdit, onDelete }: FAQItemProps) {
  return (
    <div className="rounded-xl max-w-3xl mx-auto flex flex-col gap-0">
      <div className="flex justify-end mx-2 mt-2 gap-2">
        <Button
          size="sm"
          className="rounded-b-none"
          variant="outline"
          onClick={onEdit}
        >
          Editar
        </Button>
        <Button
          size="sm"
          className="rounded-b-none"
          variant="destructive"
          onClick={onDelete}
        >
          Deletar
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value={`faq-${faq.id}`}
          className="rounded-lg border-muted-light hover:border-primary bg-card shadow-sm"
        >
          <AccordionTrigger className="px-4 py-3 text-left text-lg font-medium font-primary hover:text-primary transition-colors">
            <div
              className="overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <MarqueeEffect className="md:max-w-166 sm:max-w-120 max-w-55">
                {faq.question}
              </MarqueeEffect>
            </div>
          </AccordionTrigger>
          <AccordionContent className="break-words px-4 pb-4 text-muted-foreground font-secondary">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
