import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/components/context/AuthContext";

export default function AdminRoutes() {
  const { token, role, isLoading } = useAuth();

  if (isLoading) return <div>Verificando...</div>;
  if (!token || role !== "admin") return <Navigate to="/login" replace />;

  return <Outlet />;
}
