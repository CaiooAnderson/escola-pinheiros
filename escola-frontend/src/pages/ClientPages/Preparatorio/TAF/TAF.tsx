import AnimatedSection from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dumbbell,
  // Award,
  TrendingUp,
  Heart,
  Zap,
  Target,
  CheckCircle,
  Calendar,
  Users,
} from "lucide-react";

export default function PreparatorioTaf() {
  const tests = [
    {
      name: "Corrida de 12min",
      description:
        "Teste de capacidade cardiorrespiratória e resistência aeróbica",
      standard: "Mínimo 2.400m (masculino) / 2.000m (feminino)",
      icon: <Zap className="w-5 h-5" />,
      color: "text-primary",
    },
    {
      name: "Barra Fixa",
      description: "Teste de força muscular dos membros superiores",
      standard: "Mínimo 5 repetições (masculino) / 3 repetições (feminino)",
      icon: <Dumbbell className="w-5 h-5" />,
      color: "text-secondary",
    },
    {
      name: "Flexão de Braço",
      description: "Teste de resistência muscular localizada",
      standard: "Mínimo 20 repetições (masculino) / 15 repetições (feminino)",
      icon: <Target className="w-5 h-5" />,
      color: "text-success",
    },
    {
      name: "Abdominal",
      description: "Teste de resistência muscular abdominal",
      standard: "Mínimo 30 repetições (masculino) / 25 repetições (feminino)",
      icon: <Heart className="w-5 h-5" />,
      color: "text-info",
    },
    {
      name: "Natação 50m",
      description: "Teste de habilidade aquática e resistência",
      standard: "Máximo 60 segundos (ambos os sexos)",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-warning",
    },
  ];

  // const methodology = [
  //   {
  //     title: "Avaliação Inicial",
  //     description: "Diagnóstico completo do seu condicionamento físico atual",
  //     icon: <Target className="w-6 h-6" />,
  //   },
  //   {
  //     title: "Periodização",
  //     description: "Planejamento estratégico para evolução constante e segura",
  //     icon: <Calendar className="w-6 h-6" />,
  //   },
  //   {
  //     title: "Treinos Específicos",
  //     description: "Exercícios direcionados para cada teste do TAF",
  //     icon: <Dumbbell className="w-6 h-6" />,
  //   },
  //   {
  //     title: "Simulados",
  //     description: "Testes práticos em condições reais de avaliação",
  //     icon: <Award className="w-6 h-6" />,
  //   },
  // ];

  const results = [
    { value: "95%", label: "Taxa de Aprovação" },
    { value: "1000+", label: "Alunos Preparados" },
    { value: "4.9", label: "Avaliação dos Alunos" },
    { value: "24/7", label: "Suporte Personalizado" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section className="relative py-20 bg-gradient-to-r from-secondary/10 via-primary/5 to-success/10">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up" animateOnMount>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Preparatório <span className="text-secondary">TAF</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Preparação{" "}
                <span className="text-primary font-semibold">
                  especializada
                </span>{" "}
                para o Teste de Aptidão Física dos{" "}
                <span className="text-secondary font-semibold">
                  principais concursos
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="font-semibold text-lg px-8 py-3 bg-secondary hover:bg-secondary-dark"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agende sua Avaliação
                </Button>
                <Button
                  variant="outlineSecondary"
                  size="lg"
                  className="font-semibold text-lg px-8 py-3 bg-background"
                >
                  Conheça o Método
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
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
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 h-full">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 ${test.color} bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {test.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">
                      {test.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {test.description}
                    </p>
                    <Badge
                      variant="outline"
                      className={`${test.color} border-current`}
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

      <section className="py-16 bg-card">
        {/* <div className="container mx-auto px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nossa <span className="text-secondary">Metodologia</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Processo estruturado para garantir sua evolução física com
                segurança
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((item, index) => (
              <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                <Card className="border-2 border-muted hover:border-secondary/50 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <div className="text-secondary">{item.icon}</div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div> */}
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Resultados que <span className="text-success">Inspiram</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nosso preparatório TAF é desenvolvido por profissionais de
                  educação física com experiência em concursos públicos,
                  garantindo que você atinja os padrões exigidos com{" "}
                  <span className="text-primary font-semibold">segurança</span>{" "}
                  e
                  <span className="text-secondary font-semibold">
                    {" "}
                    eficiência
                  </span>
                  .
                </p>
                <p className="text-muted-foreground mb-8">
                  Com treinamentos personalizados de acordo com o edital do seu
                  concurso e acompanhamento individual do seu desenvolvimento,
                  garantimos sua evolução física de forma consistente.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-primary/10 rounded-lg"
                    >
                      <div className="text-2xl font-bold text-primary mb-1">
                        {result.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-2 border-secondary/20">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Users className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Vantagens Exclusivas
                    </h3>
                    <p className="text-muted-foreground">
                      Tudo que você precisa para superar o TAF com excelência
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Avaliação física completa",
                      "Planilha de treinos personalizada",
                      "Acompanhamento nutricional",
                      "Simulados periódicos",
                      "Suporte psicológico",
                      "Grupo de estudos exclusivo",
                    ].map((advantage, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-foreground font-medium text-sm">
                          {advantage}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-t from-secondary/70 to-secondary-dark">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up">
            <div className="text-center text-primary-foreground max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prepare-se para o <span className="text-white">Sucesso</span>
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Agende sua avaliação física e descubra como podemos transformar
                seu condicionamento
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outlineSecondary"
                  className="font-semibold text-lg px-8 py-3 bg-background shadow-lg shadow-background"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Avaliação
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
