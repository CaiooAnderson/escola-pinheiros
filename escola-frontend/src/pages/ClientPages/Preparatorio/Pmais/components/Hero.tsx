import AnimatedSection from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

export default function Hero() {
  const openWhatsApp = (message: string) => {
    const phoneNumber = "5521971681314";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleAgendarAvaliacao = () => {
    const message =
      "Olá! Gostaria de agendar uma avaliação para o Preparatório P+.";
    openWhatsApp(message);
  };

  return (
    <section className="relative py-30 bg-gradient-to-bl from-primary/20 via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <AnimatedSection direction="up" animateOnMount>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Preparatório <span className="text-primary">P+</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              A preparação mais{" "}
              <span className="text-primary font-semibold">completa</span> e
              <span className="text-secondary font-semibold"> direcionada</span>{" "}
              para você conquistar sua vaga no serviço público
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-lg px-8 py-3 bg-background drop-shadow-lg shadow-background/40"
                onClick={handleAgendarAvaliacao}
              >
                <CalendarPlus className="w-5 h-5 mr-2" />
                Agendar Avaliação
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
