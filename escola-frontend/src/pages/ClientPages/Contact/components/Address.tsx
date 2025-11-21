import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import AnimatedSection from "@/components/animations/AnimatedSection";
import MarqueeEffect from "@/components/animations/MarqueeEffect";

export default function Address() {
  const latitude = -22.8125;
  const longitude = -43.5919;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Texto Copiado!");
  };

  const handleOpenMap = () => {
    window.open("https://maps.app.goo.gl/35MzsAk328YfmC149", "_blank");
  };

  return (
    <div className="space-y-6">
      <AnimatedSection direction="zoom" delay={0.1}>
        <div className="bg-primary-light/10 rounded-xl p-6 shadow-md max-w-lg mx-auto">
          <h3 className="text-xl font-bold font-primary text-primary-dark mb-4 text-center">
            Nossa Localização
          </h3>
          <div className="rounded-lg overflow-hidden h-64 border border-primary/20">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                longitude - 0.01
              }%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${
                latitude + 0.01
              }&layer=mapnik&marker=${latitude}%2C${longitude}`}
              title="Localização do Centro Educacional Pinheiros"
              className="border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={handleOpenMap}
              className="text-primary hover:text-primary-dark font-medium underline transition-colors"
            >
              Ver mapa ampliado
            </button>
          </div>
        </div>
      </AnimatedSection>

      <div className="bg-primary-light/10 rounded-xl p-6 shadow-md max-w-lg mx-auto flex flex-col gap-3">
        <AnimatedSection direction="left" delay={0.2}>
          <div
            className="flex items-start gap-3 cursor-pointer text-text hover:text-primary transition-colors"
            onClick={handleOpenMap}
          >
            <MapPin className="text-primary-dark w-7 h-7 flex-shrink-0 mt-1" />
            <span className="flex-1 text-lg font-medium break-words">
              R. Caetano Luís Muze, 110 - Jardim Paraíso, Nova Iguaçu - RJ,
              26297-021
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="left" delay={0.3}>
          <div
            className="flex items-start gap-3 cursor-pointer text-text hover:text-primary transition-colors"
            onClick={() => handleCopy("(21) 97168-1314")}
          >
            <Phone className="text-primary-dark w-7 h-7 flex-shrink-0 mt-1" />
            <span className="flex-1 text-lg font-medium">(21) 97168-1314</span>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="left" delay={0.4}>
          <div
            className="flex items-start gap-3 cursor-pointer text-text hover:text-primary transition-colors"
            onClick={() => handleCopy("pinheirosonline@gmail.com")}
          >
            <Mail className="text-primary-dark w-7 h-7 flex-shrink-0 mt-1" />
            <MarqueeEffect>
              <span className="flex-1 text-lg font-medium cursor-pointer">
                pinheirosonline@gmail.com
              </span>
            </MarqueeEffect>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
