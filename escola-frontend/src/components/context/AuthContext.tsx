import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  role: string | null;
  isLoading: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedRole = sessionStorage.getItem("role");

    if (!storedToken || !storedRole) {
      setIsLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-token`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (!res.ok) throw new Error("Token inválido");

        const data = await res.json();
        if (data.role !== "admin") throw new Error("Acesso negado");

        setToken(storedToken);
        setRole(storedRole);
      } catch {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = (newToken: string, newRole: string) => {
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};