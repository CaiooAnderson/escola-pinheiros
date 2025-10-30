import Layout from "./Layout";
import type { NavLink } from "./Layout";
import type { ReactNode } from "react";

const adminLinks: NavLink[] = [
  { name: "Início", path: "/admin/inicio" },
  { name: "Promoções", path: "/admin/promocao" },
  { name: "Feedback", path: "/admin/feedback" },
  { name: "Eventos", path: "/admin/eventos" },
  { name: "Perguntas Frequentes", path: "/admin/perguntas-frequentes" },
];

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <Layout links={adminLinks}>{children}</Layout>;
}
