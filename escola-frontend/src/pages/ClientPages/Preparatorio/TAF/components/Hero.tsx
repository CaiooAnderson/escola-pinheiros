import AnimatedSection from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function Hero() {
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
    <section className="relative py-30 bg-gradient-to-br from-secondary/20 via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <AnimatedSection direction="up" animateOnMount>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Preparatório <span className="text-secondary">TAF</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Preparação{" "}
              <span className="text-primary font-semibold">especializada</span>{" "}
              para o Teste de Aptidão Física dos{" "}
              <span className="text-secondary font-semibold">
                principais concursos
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="font-semibold text-lg px-8 py-3 bg-secondary hover:bg-secondary-dark"
                onClick={handleAgendarAvaliacao}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agende sua Avaliação
              </Button>
              <Button
                variant="outlineSecondary"
                size="lg"
                className="font-semibold text-lg px-8 py-3 bg-background"
              >
                Conheça o Método
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
