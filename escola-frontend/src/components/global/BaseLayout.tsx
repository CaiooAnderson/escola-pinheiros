import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type BaseLayoutProps = {
  children: ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 w-full mx-0 p-0">{children}</main>
    </div>
  );
}
