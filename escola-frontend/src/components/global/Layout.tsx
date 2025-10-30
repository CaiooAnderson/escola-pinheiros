import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export type NavLink = {
  name: string;
  path: string;
};

export type LayoutProps = {
  children: ReactNode;
  links?: NavLink[];
};

export default function Layout({ children, links }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {links && <Navbar links={links} />}
      <main className="flex-1 w-full mx-0 p-0">{children}</main>
      {links && <Footer />}
    </div>
  );
}