import { useTheme } from "@/components/animations/ThemeProvider";
import { Monitor, Moon, Sun } from "lucide-react";
import { JSX, useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    let newIcon;
    if (theme === "light") newIcon = <Sun className="h-5 w-5" />;
    else if (theme === "dark") newIcon = <Moon className="h-5 w-5" />;
    else newIcon = <Monitor className="h-5 w-5" />;

    setIcon(
      <div className="transition-all duration-300 ease-in-out transform scale-100 opacity-100">
        {newIcon}
      </div>
    );
  }, [theme]);

  const handleClick = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Alternar tema"
      className="border cursor-pointer border-primary rounded-md p-2 bg-primary/20 hover:bg-primary text-primary hover:text-white transition-all duration-300 ease-in-out"
    >
      {icon}
    </button>
  );
}
