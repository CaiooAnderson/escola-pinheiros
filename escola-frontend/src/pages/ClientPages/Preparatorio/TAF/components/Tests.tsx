import AnimatedSection from "@/components/animations/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Heart, Zap, Target, TrendingUp } from "lucide-react";

const tests = [
  {
    name: "Corrida",
    description:
      "Teste de capacidade cardiorrespiratória e resistência aeróbica",
    standard: "Trote, Caminhada ou Corrida",
    icon: <Zap className="w-5 h-5" />,
    color: "text-primary",
  },
  {
    name: "Barra Fixa",
    description: "Teste de força muscular dos membros superiores",
    standard: "Isometria ou Barra Fixa",
    icon: <Dumbbell className="w-5 h-5" />,
    color: "text-secondary",
  },
  {
    name: "Flexão de Braço",
    description: "Teste de resistência muscular localizada",
    standard:
      "Flexão com joelhos apoiados, Flexão inclinada ou Flexão tradicional",
    icon: <Target className="w-5 h-5" />,
    color: "text-success",
  },
  {
    name: "Abdominal",
    description: "Teste de resistência muscular abdominal",
    standard: "Supra ou Remador",
    icon: <Heart className="w-5 h-5" />,
    color: "text-info",
  },
  {
    name: "Natação",
    description: "Teste de habilidade aquática e resistência",
    standard: "Nado Crawl, Peito, Borboleta, Costas ou Apnéia",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-warning",
  },
];

export default function Tests() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5 transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Testes <span className="text-primary">Preparados</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preparação completa para todos os testes físicos exigidos nos
              principais concursos
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.1}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div
                    className={`w-12 h-12 ${test.color} bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {test.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {test.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 flex-1">
                    {test.description}
                  </p>
                  <Badge
                    variant="outline"
                    className={`${test.color} border-current w-fit`}
                  >
                    {test.standard}
                  </Badge>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
