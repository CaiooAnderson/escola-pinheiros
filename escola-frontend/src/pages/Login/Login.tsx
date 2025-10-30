import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, token, role, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && token && role === "admin") {
      navigate("/admin/inicio", { replace: true });
    }
    if (!isLoading && token && role !== "admin") {
      navigate("/inicio", { replace: true });
    }
  }, [isLoading, token, role, navigate]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error("Email e senha são obrigatórios!");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erro ao fazer login");
        return;
      }

      login(data.token, data.role);

      toast.success("Login realizado com sucesso!");

      if (data.role === "admin") navigate("/admin/inicio");
      else navigate("/inicio");
    } catch (err) {
      toast.error("Erro ao realizar o login");
    }
  };

  if (isLoading) return <div>Verificando sessão...</div>;

  return (
    <div className="container mx-auto px-4 w-full flex items-center justify-center h-dvh relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 left-4 shadow-md border-secondary hover:scale-[0.96] text-secondary hover:bg-secondary-light"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Card className="w-full max-w-md shadow-xl border-card">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-primary text-secondary-dark text-center">
            Faça o Login
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="bg-secondary hover:bg-secondary-dark text-white w-full"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
