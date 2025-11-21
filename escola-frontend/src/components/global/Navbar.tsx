import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/global/ModeToggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
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
  const [preparatorioMobileOpen, setPreparatorioMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const defaultLinks: NavLink[] = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/sobre" },
    { name: "Eventos", path: "/eventos" },
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

  const preparatorioItems = [
    { name: "P+", path: "/preparatorio/pmais" },
    { name: "TAF", path: "/preparatorio/taf" },
    { name: "Aprovados", path: "/preparatorio/aprovados" },
  ];

  const handleMobileLinkClick = () => {
    setMobileOpen(false);
    setPreparatorioMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${headerClasses()}`}
    >
      <div className="w-full container mx-auto p-4">
        <div className="hidden lg:flex items-center justify-between w-full">
          <div className="flex items-center gap-6 xl:gap-8 flex-shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-200 font-bold whitespace-nowrap text-sm xl:text-base ${
                  location.pathname === link.path
                    ? "text-primary font-semibold"
                    : scrolled || mobileOpen
                    ? "text-muted-dark hover:text-primary"
                    : "text-muted-dark hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "transition-colors duration-200 font-bold whitespace-nowrap text-sm xl:text-base bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-primary",
                      scrolled || mobileOpen
                        ? "text-muted-dark hover:text-primary"
                        : "text-muted-dark hover:text-primary"
                    )}
                  >
                    Preparatório
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {preparatorioItems.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.path}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={() => setMobileOpen(false)}
                            >
                              <div className="text-sm font-medium leading-none">
                                {item.name}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2 mx-4 flex-shrink-0">
            <Button
              variant="default"
              size="sm"
              className="text-xs xl:text-sm"
              onClick={() =>
                handlePortalClick("https://pinheiros.alunos.digital/login")
              }
            >
              Portal do Aluno
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-xs xl:text-sm"
              onClick={() =>
                handlePortalClick("https://pinheiros.professores.digital/login")
              }
            >
              Portal do Professor
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="text-xs xl:text-sm"
              onClick={() => handlePortalClick("https://ava.sae.digital/")}
            >
              SAE Digital
            </Button>
          </div>

          <div className="flex items-center justify-end flex-shrink-0">
            <ModeToggle />
          </div>
        </div>

        <div className="lg:hidden flex items-center justify-between">
          <div className="flex-1 flex justify-center">
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
      </div>

      {mobileOpen && (
        <div
          className={`lg:hidden flex flex-col gap-1 px-4 pb-4 transition-all duration-200 ${
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
                    ? "text-primary font-semibold"
                    : "text-primary font-semibold"
                  : isAdmin
                  ? "text-muted hover:text-primary"
                  : "text-muted hover:text-primary"
              }`}
              onClick={handleMobileLinkClick}
            >
              {link.name}
            </Link>
          ))}

          <div className="px-3 py-2">
            <button
              className={`flex items-center justify-between px-0 py-2 rounded-md transition-colors duration-200 font-bold ${
                preparatorioMobileOpen
                  ? "text-primary font-semibold"
                  : "text-muted hover:text-primary"
              }`}
              onClick={() => setPreparatorioMobileOpen(!preparatorioMobileOpen)}
            >
              <span>Preparatório</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  preparatorioMobileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {preparatorioMobileOpen && (
              <div className="flex flex-col gap-1 ml-4 mt-2">
                {preparatorioItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "text-primary font-semibold"
                        : "text-muted hover:text-primary"
                    }`}
                    onClick={handleMobileLinkClick}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 my-4 justify-center">
            <Button
              variant="default"
              size="sm"
              className="w-3xs"
              onClick={() => {
                handleMobileLinkClick();
                handlePortalClick("https://pinheiros.alunos.digital/login");
              }}
            >
              Portal do Aluno
            </Button>
            <Button
              variant="default"
              size="sm"
              className="w-3xs"
              onClick={() => {
                handleMobileLinkClick();
                handlePortalClick(
                  "https://pinheiros.professores.digital/login"
                );
              }}
            >
              Portal do Professor
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="w-3xs"
              onClick={() => {
                handleMobileLinkClick();
                handlePortalClick("https://ava.sae.digital/");
              }}
            >
              SAE Digital
            </Button>
          </div>

          <div className="flex justify-center my-4">
            <Avatar className="h-40 w-40 bg-primary/40 p-4">
              <AvatarImage src={Logo} alt="Logo da Escola" />
              <AvatarFallback>CEP</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex justify-center">
            <ModeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
