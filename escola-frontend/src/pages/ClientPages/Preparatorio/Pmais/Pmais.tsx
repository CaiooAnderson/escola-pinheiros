import AnimatedSection from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Users,
  NotebookText,
  ShieldQuestionMark,
  Award,
  CheckCircle,
  UserRoundCheck,
  ShieldCheck,
  BookmarkCheck,
  CalendarPlus,
} from "lucide-react";

import ApprovedImage from "@/assets/pmais/P+.jpg";

export default function PreparatorioPmais() {
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

  const benefits = [
    {
      icon: <BookmarkCheck className="w-5 h-5" />,
      text: "Metodologia comprovada",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Acompanhamento individual",
    },
    {
      icon: <UserRoundCheck className="w-5 h-5" />,
      text: "Alta taxa de aprovação",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      text: "Garantia de qualidade",
    },
  ];

  const courses = [
    {
      name: "ESA",
      description: "Escola de Sargentos das Armas",
      color: "bg-primary/20 border-primary",
      whatsappMessage:
        "Olá! Gostaria de me inscrever no curso ESA (Escola de Sargentos das Armas) do Preparatório P+.",
    },
    {
      name: "EEAR",
      description: "Escola de Especialistas de Aeronáutica",
      color: "bg-info/20 border-info",
      whatsappMessage:
        "Olá! Gostaria de me inscrever no curso EEAR (Escola de Especialistas de Aeronáutica) do Preparatório P+.",
    },
    {
      name: "PF/PC",
      description: "Polícia Federal e Civil",
      color: "bg-success/20 border-success",
      whatsappMessage:
        "Olá! Gostaria de me inscrever no curso PF/PC (Polícia Federal e Civil) do Preparatório P+.",
    },
    {
      name: "Outros",
      description: "Demais cargos de segurança",
      color: "bg-info/20 border-info",
      whatsappMessage:
        "Olá! Gostaria de me inscrever em outros cursos do Preparatório P+ e gostaria de mais informações.",
    },
  ];

  const openWhatsApp = (message: string) => {
    const phoneNumber = "5521971681314";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleAgendarAvaliacao = () => {
    const message =
      "Olá! Gostaria de agendar uma avaliação para o Preparatório P+.";
    openWhatsApp(message);
  };

  const handleEntrarContato = () => {
    const message =
      "Olá! Gostaria de mais informações sobre o Preparatório P+.";
    openWhatsApp(message);
  };

  const handleInscreverCurso = (courseMessage: string) => {
    openWhatsApp(courseMessage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section className="relative py-30 bg-gradient-to-bl from-primary/20 via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up" animateOnMount>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Preparatório <span className="text-primary">P+</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                A preparação mais{" "}
                <span className="text-primary font-semibold">completa</span> e
                <span className="text-secondary font-semibold">
                  {" "}
                  direcionada
                </span>{" "}
                para você conquistar sua vaga no serviço público
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold text-lg px-8 py-3 bg-background drop-shadow-lg shadow-background/40"
                  onClick={handleAgendarAvaliacao}
                >
                  <CalendarPlus className="w-5 h-5 mr-2" />
                  Agendar Avaliação
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

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

      <section className="py-16 bg-gradient-to-tr from-success/5 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Cursos <span className="text-primary">Disponíveis</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Preparação especializada para as principais carreiras de
                segurança pública
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                <Card
                  className={`border-2 ${course.color} hover:shadow-lg transition-all duration-300 h-full flex flex-col group`}
                >
                  <CardContent className="p-6 text-center flex flex-col flex-grow">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce transition-transform shadow-md">
                      <ShieldCheck
                        className={`w-8 h-8 ${course.color
                          .replace("bg-", "text-")
                          .replace("/20", "")}`}
                      />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-foreground">
                      {course.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">
                      {course.description}
                    </p>
                    <Button
                      className="sm:w-full w-fit mx-auto mt-auto group-hover:animate-pulse"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInscreverCurso(course.whatsappMessage);
                      }}
                    >
                      Inscrever-se
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5 transition-all duration-500 ease-in-out">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="zoom">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 overflow-hidden group hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative h-full min-h-[400px] w-full">
                    <img
                      src={ApprovedImage}
                      alt="Benefícios do Preparatório P+ - Alunos aprovados e resultados comprovados"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 right-4 text-center">
                      <Badge className="bg-background text-text border-none group-hover:bg-primary/80">
                        Resultados Comprovados
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <Card className="bg-gradient-to-br from-primary/20 to-secondary/10 border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Vantagens Exclusivas
                    </h3>
                    <p className="text-foreground/80">
                      Descubra os benefícios que fazem a diferença
                    </p>
                  </div>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors duration-200"
                      >
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="text-primary">{benefit.icon}</div>
                        </div>
                        <span className="text-foreground font-medium">
                          {benefit.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-primary/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          95%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Aprovação
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">
                          200+
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Alunos
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-success">
                          4.9
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Avaliação
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-t from-primary/70 to-primary-dark">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up">
            <div className="text-center text-primary-foreground max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Entre em contato e garanta sua vaga no preparatório mais
                eficiente do mercado
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold text-lg px-8 py-3 bg-background hover:shadow-md shadow-background border hover:border-background"
                  onClick={handleEntrarContato}
                >
                  <CalendarPlus className="w-5 h-5 mr-2" />
                  Entrar em Contato
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
