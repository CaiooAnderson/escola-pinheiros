import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/global/ModeToggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/assets/logo.png";

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
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/sobre" },
    // { name: "Eventos", path: "/eventos" },
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
      return "bg-card/60 backdrop-blur-sm shadow-lg lg:py-0.5 py-0";
    return "bg-transparent";
  };

  const handlePortalClick = (url: string) => {
    setMobileOpen(false);
    window.open(url, "_blank");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${headerClasses()}`}
    >
      <div className="w-full container mx-auto flex items-center justify-between p-4">
        <div className="hidden lg:flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Button
            variant="default"
            size="sm"
            onClick={() =>
              handlePortalClick("https://pinheiros.alunos.digital/login")
            }
          >
            Portal do Aluno
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() =>
              handlePortalClick("https://pinheiros.professores.digital/login")
            }
          >
            Portal do Professor
          </Button>
        </div>

        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-200 font-medium ${
                location.pathname === link.path
                  ? isAdmin
                    ? "text-primary font-semibold"
                    : "text-primary font-semibold"
                  : scrolled || mobileOpen
                  ? isAdmin
                    ? "text-muted-dark hover:text-primary"
                    : "text-muted-dark hover:text-primary"
                  : isAdmin
                  ? "text-muted-dark hover:text-primary"
                  : "text-muted-dark hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Avatar className="h-12 w-12 mx-2 bg-primary/40 rounded-xl hover:bg-primary-dark/60 transition-all duration-300">
            <AvatarImage src={Logo} alt="Logo da Escola" />
            <AvatarFallback>CEP</AvatarFallback>
          </Avatar>

          <ModeToggle />
        </div>

        <div className="lg:hidden flex-1 flex justify-center">
          <button
            className={`transition-colors duration-200 flex items-center justify-center ${
              scrolled || mobileOpen
                ? isAdmin
                  ? "text-gray-700 hover:text-primary"
                  : "text-gray-700 hover:text-primary"
                : "text-muted-dark"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 cursor-pointer" />
            ) : (
              <MenuIcon className="h-6 w-6 cursor-pointer hover:text-primary" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`lg:hidden flex flex-col gap-1 px-4 pb-4 transition-all duration-200 ${
            scrolled ? "bg-card/80 shadow-md" : "bg-card shadow-md"
          }`}
        >
          <div className="flex flex-row gap-2 mb-4 justify-center">
            <Button
              variant="default"
              size="sm"
              className="w-3xs"
              onClick={() =>
                handlePortalClick("https://pinheiros.alunos.digital/login")
              }
            >
              Portal do Aluno
            </Button>
            <Button
              variant="default"
              size="sm"
              className="w-3xs"
              onClick={() =>
                handlePortalClick("https://pinheiros.professores.digital/login")
              }
            >
              Portal do Professor
            </Button>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                location.pathname === link.path
                  ? isAdmin
                    ? "text-primary font-semibold"
                    : "text-primary font-semibold"
                  : isAdmin
                  ? "text-muted hover:text-primary"
                  : "text-muted hover:text-primary"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex justify-center my-4">
            <Avatar className="h-16 w-16 bg-primary/40">
              <AvatarImage src={Logo} alt="Logo da Escola" />
              <AvatarFallback>CEP</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex justify-end">
            <ModeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
