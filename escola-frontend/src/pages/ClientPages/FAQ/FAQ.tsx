import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import MarqueeEffect from "@/components/animations/MarqueeEffect";
import { FAQSkeleton } from "@/components/skeletons/FAQSkeleton";
import FloatButton from "@/components/global/FloatButton";
import faqData from "./FAQ.json";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type FAQProps = {
  isAdmin?: boolean;
  limit?: number;
};

export default function FAQ({ isAdmin, limit }: FAQProps) {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFaqs(faqData.faqs);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <div className="w-full">
      <div className={isAdmin ? "py-0" : "container mx-auto py-30 px-4"}>
        <div className="max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            {!isAdmin && (
              <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold font-primary text-primary-dark mb-2">
                  Perguntas Frequentes
                </h1>
                <p className="text-lg text-muted-dark font-secondary">
                  Encontre respostas para as dúvidas mais comuns sobre nossa
                  escola
                </p>
              </div>
            )}
          </AnimatedSection>

          {loading ? (
            <FAQSkeleton count={limit || 6} />
          ) : displayedFaqs.length === 0 ? (
            <div
              className={`w-full flex justify-center ${
                isAdmin ? "items-start h-30" : "items-center"
              }`}
            >
              <p className="font-secondary text-lg text-muted-dark text-center">
                Não há perguntas frequentes disponíveis no momento.
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {displayedFaqs.map((faq, index) => (
                <AnimatedSection
                  key={faq.id}
                  direction="up"
                  delay={index * 0.05}
                >
                  <AccordionItem
                    value={`item-${faq.id}`}
                    className="border-muted-light hover:border-primary rounded-lg bg-card shadow-sm"
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
                </AnimatedSection>
              ))}
            </Accordion>
          )}
        </div>
      </div>
      <FloatButton />
    </div>
  );
}
