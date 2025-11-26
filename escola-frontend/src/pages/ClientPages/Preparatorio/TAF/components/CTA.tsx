import AnimatedSection from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function CTA() {
  const openWhatsApp = (message: string) => {
    const phoneNumber = "5521971681314";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleAgendarAvaliacao = () => {
    const message =
      "Olá! Gostaria de agendar uma avaliação para o Preparatório TAF.";
    openWhatsApp(message);
  };

  return (
    <section className="py-16 bg-gradient-to-t from-secondary/70 to-secondary-dark">
      <div className="container mx-auto px-4">
        <AnimatedSection direction="up">
          <div className="text-center text-primary-foreground max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prepare-se para o <span className="text-text">Sucesso</span>
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Agende sua avaliação física e descubra como podemos transformar
              seu condicionamento
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outlineSecondary"
                className="font-semibold text-lg px-8 py-3 bg-background hover:shadow-md shadow-background border hover:border-background"
                onClick={handleAgendarAvaliacao}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Avaliação
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
