import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";

export default function About() {
  const features = [
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Professores Qualificados",
      description:
        "Educadores experientes e dedicados ao desenvolvimento integral dos alunos.",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      title: "Método Educacional Inovador",
      description:
        "Proposta pedagógica que incentiva a curiosidade e o pensamento crítico.",
    },
    {
      icon: <GraduationCap className="w-10 h-10 text-primary" />,
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
              <Card className="h-full p-6 rounded-2xl border-muted-light shadow-lg hover:shadow-xl transition hover:-translate-y-2 cursor-pointer flex flex-col">
                <CardContent className="flex flex-col items-center text-center gap-4 flex-1">
                  {feature.icon}
                  <h3 className="text-xl font-semibold font-primary text-primary-dark">
                    {feature.title}
                  </h3>
                  <p className="text-muted-dark font-secondary">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
