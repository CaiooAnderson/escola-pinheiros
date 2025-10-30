import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import AnimatedSection from "@/components/animations/AnimatedSection";
import MarqueeEffect from "@/components/animations/MarqueeEffect";

export default function Address() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Texto Copiado!");
  };

  const handleOpenMap = () => {
    window.open("https://maps.app.goo.gl/WYDeQHe6yXTzoGPK6", "_blank");
  };

  return (
    <AnimatedSection direction="up" delay={0.1}>
      <div className="bg-primary-light/10 rounded-xl p-6 shadow-md max-w-lg mx-auto flex flex-col gap-3">
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

        <div
          className="flex items-start gap-3 cursor-pointer text-text hover:text-primary transition-colors"
          onClick={() => handleCopy("(21) 97168-1314")}
        >
          <Phone className="text-primary-dark w-7 h-7 flex-shrink-0 mt-1" />
          <span className="flex-1 text-lg font-medium">(21) 97168-1314</span>
        </div>
        <div
          className="flex items-start gap-3 cursor-pointer text-text hover:text-primary transition-colors"
          onClick={() => handleCopy("pinheirosonline@gmail.com")}
        >
          <Mail className="text-primary-dark w-7 h-7 flex-shrink-0 mt-1" />
          <MarqueeEffect>
            <span className="flex-1 text-lg font-medium">
              pinheirosonline@gmail.com
            </span>
          </MarqueeEffect>
        </div>
      </div>
    </AnimatedSection>
  );
}
