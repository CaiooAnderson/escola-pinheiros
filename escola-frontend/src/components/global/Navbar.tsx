import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/assets/logo.png";
import { ModeToggle } from "@/components/global/ModeToggle";

type NavLink = {
  name: string;
  path: string;
};

type NavbarProps = {
  links?: NavLink[];
};

export default function Navbar({ links }: NavbarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const defaultLinks: NavLink[] = [
    { name: "Início", path: "/inicio" },
    { name: "Sobre", path: "/sobre" },
    { name: "Eventos", path: "/eventos" },
    { name: "Perguntas Frequentes", path: "/perguntas-frequentes" },
    { name: "Contato", path: "/contato" },
  ];

  const navLinks = links || defaultLinks;

  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = () => {
    if (mobileOpen && !scrolled) return "bg-card shadow-md";
    if (mobileOpen && scrolled) return "bg-card backdrop-blur-sm";
    if (!mobileOpen && scrolled)
      return "bg-card/60 backdrop-blur-sm shadow-lg sm:py-0.5 py-0";
    return "bg-transparent";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${headerClasses()}`}
    >
      <div className="w-full container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={Logo} alt="Avatar" />
            <AvatarFallback>CEP</AvatarFallback>
          </Avatar>
        </Link>

        <div className="hidden sm:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-200 font-medium ${
                location.pathname === link.path
                  ? isAdmin
                    ? "text-secondary font-semibold"
                    : "text-primary font-semibold"
                  : scrolled || mobileOpen
                  ? isAdmin
                    ? "text-muted-dark hover:text-secondary"
                    : "text-muted-dark hover:text-primary"
                  : isAdmin
                  ? "text-muted-dark hover:text-secondary"
                  : "text-muted-dark hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <ModeToggle />
        </div>

        <button
          className={`sm:hidden transition-colors duration-200 ${
            scrolled || mobileOpen
              ? isAdmin
                ? "text-gray-700 hover:text-secondary"
                : "text-gray-700 hover:text-primary"
              : "text-muted-dark"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div
          className={`sm:hidden flex flex-col gap-1 px-4 pb-4 transition-all duration-200 ${
            scrolled ? "bg-card/80 shadow-md" : "bg-card shadow-md"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                location.pathname === link.path
                  ? isAdmin
                    ? "text-secondary font-semibold"
                    : "text-primary font-semibold"
                  : isAdmin
                  ? "text-muted hover:text-secondary"
                  : "text-muted hover:text-primary"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex justify-end">
            <ModeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
