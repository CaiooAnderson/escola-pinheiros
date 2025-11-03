import { SocialIcon } from "react-social-icons";
import AnimatedSection from "@/components/animations/AnimatedSection";

const socialContacts = [
  {
    label: "Whatsapp",
    url: "https://wa.me/5521971681314",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/pinheirosonline/",
  },
  // {
  //   label: "Email",
  //   url: "mailto:pinheirosonline@gmail.com",
  // },
  {
    label: "Facebook",
    url: "https://www.facebook.com/pinheiros.escola/",
  },
];

export default function SocialContacts() {
  return (
    <AnimatedSection direction="up" delay={0.3}>
      <div className="flex justify-center gap-8">
        {socialContacts.map((contact) => (
          <SocialIcon
            key={contact.label}
            url={contact.url}
            style={{ height: 60, width: 60 }}
            className="transition-transform hover:scale-110"
          />
        ))}
      </div>
    </AnimatedSection>
  );
}
