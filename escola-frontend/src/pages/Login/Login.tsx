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
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useAuth } from "@/components/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
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
        toast.error("Email e senha são obrigatórios!", {
          position: "bottom-center",
        });
        return;
      }

      setIsLoggingIn(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erro ao fazer login", {
          position: "bottom-center",
        });
        setIsLoggingIn(false);
        return;
      }

      login(data.token, data.role);
      toast.success("Login realizado com sucesso!", {
        position: "bottom-center",
      });

      if (data.role === "admin") navigate("/admin/inicio");
      else navigate("/inicio");
    } catch (err) {
      toast.error("Erro ao realizar o login", {
        position: "bottom-center",
      });
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = () => {
    toast.info(
      "Entre em contato com o administrador do sistema para redefinir sua senha.",
      {
        position: "bottom-center",
      }
    );
  };

  if (isLoading) return <div>Verificando sessão...</div>;

  return (
    <div className="landing-bg w-full flex flex-col items-center justify-center h-dvh relative p-4">
      <Button
        variant="default"
        size="icon"
        className="absolute top-4 left-4 shadow-lg hover:scale-[0.96] bg-primary hover:bg-primary-dark border-card/50 backdrop-blur-lg border-1 text-white transition-all duration-300"
        onClick={() => navigate("/painel")}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <div className="mb-2 flex flex-col items-center">
        <img
          src="/src/assets/logo.png"
          alt="Logo"
          className="w-16 h-16 sm:w-24 sm:h-24 object-contain mb-2"
        />
        <h2 className="text-lg sm:text-2xl font-primary text-text font-semibold text-center">
          Área do Administrador
        </h2>
        <p className="text-sm text-text text-center max-w-md mt-1">
          Página dedicada à equipe administrativa do Centro Educacional
          Pinheiros
        </p>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-card/50 bg-card/70 backdrop-blur-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-primary text-primary-dark">
            Acesso Administrativo
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Insira suas credenciais para acessar o painel
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Insira o email aqui"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoggingIn}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Insira a senha aqui"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 bg-background/50"
                disabled={isLoggingIn}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary cursor-pointer transition-colors"
                disabled={isLoggingIn}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary-dark underline transition-colors cursor-pointer"
              disabled={isLoggingIn}
            >
              Esqueceu sua senha?
            </button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-2">
          <Button
            className="bg-primary hover:bg-primary-dark text-white w-full py-3 text-base font-semibold transition-all duration-300"
            onClick={handleLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                </div>
                <span>Entrando...</span>
              </div>
            ) : (
              "Entrar no Sistema"
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-md text-text">
          © {new Date().getFullYear()} Centro Educacional Pinheiros - Todos os
          direitos reservados
        </p>
      </div>
    </div>
  );
}
