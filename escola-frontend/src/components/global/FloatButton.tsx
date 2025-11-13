import { SocialIcon } from "react-social-icons";

export default function FloatButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5521971681314";
    const message = "Olá! Gostaria de mais informações sobre a escola.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-background/60 ring-1 ring-primary-light rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 cursor-pointer"
        aria-label="Fale conosco no WhatsApp"
      >
        <div className="flex items-center justify-center">
          <SocialIcon
            network="whatsapp"
            style={{ width: 52, height: 52 }}
            bgColor="transparent"
            fgColor="#25D366"
          />
        </div>
      </button>

      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20 -z-10"></div>
    </div>
  );
}
