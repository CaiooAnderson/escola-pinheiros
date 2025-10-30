import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing-bg w-full flex items-center justify-center h-dvh">
      <Card className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg text-center p-6 shadow-xl mx-2 bg-card/40 backdrop-blur-xl border border-card/30">
        <CardHeader>
          <CardTitle className="text-4xl font-primary text-primary-dark">
            Bem-vindo!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 sm:flex-row flex-col justify-center items-center">
          <Button
            variant="default"
            className="bg-primary hover:bg-primary-dark text-white sm:w-auto w-50"
            onClick={() => navigate("/inicio")}
          >
            Painel do Cliente
          </Button>
          <Button
            variant="secondary"
            className="bg-secondary hover:bg-secondary-dark text-white sm:w-auto w-50"
            onClick={() => navigate("/login")}
          >
            Painel do Administrador
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}