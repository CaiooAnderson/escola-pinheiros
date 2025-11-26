import AnimatedSection from "@/components/animations/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, NotebookText, ShieldQuestionMark } from "lucide-react";

const features = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Foco Total no Edital",
    description:
      "Preparação 100% direcionada para o conteúdo programático do seu concurso",
    color: "text-primary",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Professores Especialistas",
    description: "Corpo docente com ampla experiência em concursos públicos",
    color: "text-secondary",
  },
  {
    icon: <NotebookText className="w-8 h-8" />,
    title: "Material Exclusivo",
    description:
      "Apostilas atualizadas e exercícios específicos para sua área",
    color: "text-success",
  },
  {
    icon: <ShieldQuestionMark className="w-8 h-8" />,
    title: "Plantão de Dúvidas",
    description: "Suporte contínuo para resolver suas questões em tempo real",
    color: "text-info",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5 transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por que escolher o <span className="text-primary">P+</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra os diferenciais que fazem do nosso preparatório o mais
              eficiente do mercado
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.1}>
              <Card className="group shadow-md hover:shadow-lg transition-all duration-300 border-2 border-primary/50 hover:border-primary/50 h-full">
                <CardContent className="p-6 text-center rounded-lg bg-gradient-to-b from-primary/20 to-muted-light/5 group-hover:from-primary-dark/20 group-hover:to-secondary/20 transition-colors duration-300 h-full flex flex-col items-center">
                  <div
                    className={`w-10 h-10 ${feature.color} bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-10 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}