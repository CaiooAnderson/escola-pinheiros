import AnimatedSection from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

export default function CTA() {
  const openWhatsApp = (message: string) => {
    const phoneNumber = "5521971681314";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEntrarContato = () => {
    const message =
      "Olá! Gostaria de mais informações sobre o Preparatório P+.";
    openWhatsApp(message);
  };

  return (
    <section className="py-16 bg-gradient-to-t from-primary/70 to-primary-dark">
      <div className="container mx-auto px-4">
        <AnimatedSection direction="up">
          <div className="text-center text-primary-foreground max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Entre em contato e garanta sua vaga no preparatório mais eficiente
              do mercado
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-lg px-8 py-3 bg-background hover:shadow-md shadow-background border hover:border-background"
                onClick={handleEntrarContato}
              >
                <CalendarPlus className="w-5 h-5 mr-2" />
                Entrar em Contato
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
