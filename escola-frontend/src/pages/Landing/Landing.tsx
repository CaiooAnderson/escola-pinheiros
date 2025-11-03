import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderCog } from "lucide-react";
import Logo from "@/assets/logo.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-bg w-full flex items-center justify-center h-dvh relative">
      <div className="absolute top-1/4 transform -translate-y-1/2">
        <img
          src={Logo}
          alt="Logo"
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 opacity-75 object-contain"
        />
      </div>

      <Card className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg text-center p-6 shadow-xl mx-2 bg-card/60 backdrop-blur-xl border border-card/40 relative z-10 mt-48 md:mt-56 lg:mt-64">
        <CardHeader>
          <CardTitle className="text-4xl font-primary text-primary-dark">
            Bem-vindo!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center items-center">
          <Button
            variant="default"
            className="bg-primary hover:bg-primary-dark text-white w-3/4 sm:w-48 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 mb-4"
            onClick={() => navigate("/")}
          >
            Acessar Site
          </Button>
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => navigate("/login")}
              className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
              title="Acessar página do Administrador"
            >
              <FolderCog className="w-6 h-6 cursor-pointer" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
