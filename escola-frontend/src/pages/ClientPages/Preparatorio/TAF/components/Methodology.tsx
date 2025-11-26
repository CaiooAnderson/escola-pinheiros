import AnimatedSection from "@/components/animations/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Calendar, Dumbbell, Award } from "lucide-react";

const methodology = [
  {
    title: "Avaliação Inicial",
    description:
      "Diagnóstico completo do seu condicionamento físico atual para criar um plano personalizado",
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: "Periodização",
    description:
      "Planejamento estratégico dividido em fases para evolução constante e segura",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    title: "Treinos Específicos",
    description:
      "Exercícios direcionados especificamente para cada teste do TAF",
    icon: <Dumbbell className="w-6 h-6" />,
  },
  {
    title: "Simulados Periódicos",
    description: "Testes práticos regulares em condições reais de avaliação",
    icon: <Award className="w-6 h-6" />,
  },
];

export default function Methodology() {
  return (
    <section className="py-16 bg-gradient-to-tr from-success/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossa <span className="text-secondary">Metodologia</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Processo estruturado em 4 pilares para garantir sua evolução
              física com segurança e eficiência
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodology.map((item, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.1}>
              <Card className="border-2 border-muted hover:border-secondary/50 hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                <CardContent className="p-6 text-center flex flex-col flex-1">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                    <div className="text-secondary group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-muted/50">
                    <span className="text-xs font-semibold text-secondary">
                      Etapa {index + 1}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
