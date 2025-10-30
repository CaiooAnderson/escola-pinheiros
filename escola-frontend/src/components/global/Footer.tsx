import { Copyright, Bot } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Footer() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <footer
      className={`mt-2 ${
        isAdmin
          ? "bg-card/60 text-secondary-dark"
          : "bg-primary-light/10 text-primary-dark"
      }`}
    >
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-base font-primary flex flex-row gap-2 items-center">
          Todos os direitos reservados {new Date().getFullYear()}{" "}
          <Copyright className="w-4 h-4" />
        </span>

        <div className="flex gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <a
                href="https://github.com/CaiooAnderson"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Bot className="w-6 h-6" />
              </a>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-40 text-center">
              GitHub do Programador!
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </footer>
  );
}