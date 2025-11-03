import Layout from "./Layout";
import type { NavLink } from "./Layout";
import type { ReactNode } from "react";

const clientLinks: NavLink[] = [
  { name: "Início", path: "/" },
  { name: "Sobre", path: "/sobre" },
  { name: "Eventos", path: "/eventos" },
  { name: "Perguntas Frequentes", path: "/perguntas-frequentes" },
  { name: "Contato", path: "/contato" },
];

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  return <Layout links={clientLinks}>{children}</Layout>;
}
