import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";

export default function About() {
  const features = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Professores Qualificados",
      description:
        "Educadores experientes e dedicados ao desenvolvimento integral dos alunos.",
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Método Educacional Inovador",
      description:
        "Proposta pedagógica que incentiva a curiosidade e o pensamento crítico.",
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: "Formação Completa",
      description:
        "Preparação para os desafios acadêmicos e para a vida em sociedade.",
    },
  ];

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto py-20 px-4 text-center">
        <AnimatedSection direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold font-primary text-primary-dark mb-6">
            Nossa Proposta
          </h2>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <p className="text-lg sm:text-xl font-secondary text-muted-dark max-w-3xl mx-auto mb-12">
            No{" "}
            <span className="font-semibold text-primary-dark">
              Centro Educacional Pinheiros
            </span>
            , acreditamos em uma educação que vai além da sala de aula.
            Desenvolvemos cidadãos críticos, criativos e preparados para os
            desafios do futuro.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <AnimatedSection key={i} direction="up" delay={i * 0.2}>
              <Card className="h-full p-6 rounded-2xl border-muted-light shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />

                <CardContent className="flex flex-col items-center text-center gap-4 flex-1 relative z-10">
                  <div className="text-primary transition-all duration-500 group-hover:scale-110 group-hover:text-secondary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold font-primary text-primary-dark transition-all duration-500 group-hover:text-secondary-light">
                    {feature.title}
                  </h3>
                  <p className="text-muted-dark font-secondary transition-all duration-500 group-hover:text-foreground">
                    {feature.description}
                  </p>
                </CardContent>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-x-100 scale-x-0" />
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
