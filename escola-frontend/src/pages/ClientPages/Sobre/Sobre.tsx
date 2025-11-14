import { useState, useEffect, useRef } from "react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  HeartHandshake,
  Award,
  Clock,
  Star,
  Trophy,
  School,
  Heart,
  NotebookPen,
} from "lucide-react";
import { Link } from "react-router-dom";
import Staff from "./components/Staff";
import diretor0 from "@/assets/diretores/diretor0.png";
import diretor1 from "@/assets/diretores/diretor1.png";
import diretor2 from "@/assets/diretores/diretor2.png";
import diretor3 from "@/assets/diretores/diretor3.png";
import coordenador1 from "@/assets/coordenadores/coordenadora1.png";
import coordenador2 from "@/assets/coordenadores/coordenadora2.png";
import coordenador3 from "@/assets/coordenadores/coordenadora3.png";
import FloatButton from "@/components/global/FloatButton";

const teamMembers = {
  directors: [
    {
      name: "Iza D'alegria",
      role: "Diretora Fundadora",
      imageUrl: diretor0,
      fallback: "ID",
    },
    {
      name: "Leandro D'alegria",
      role: "Diretor Fundador",
      imageUrl: diretor1,
      fallback: "LD",
    },
    {
      name: "Carlos Alberto",
      role: "Diretor Pedagógico",
      imageUrl: diretor2,
      fallback: "CA",
    },
    {
      name: "Rosilene Campos",
      role: "Diretora Administrativa",
      imageUrl: diretor3,
      fallback: "RC",
    },
  ],
  coordinators: [
    {
      name: "Rejane de Oliveira",
      role: "Coord. Fund II e Ensino Médio",
      imageUrl: coordenador1,
      fallback: "RO",
    },
    {
      name: "Letícia Gonsalves",
      role: "Coord. Educação Infantil",
      imageUrl: coordenador2,
      fallback: "LG",
    },
    {
      name: "Roberta Lígia",
      role: "Coord Fundamental I",
      imageUrl: coordenador3,
      fallback: "RL",
    },
  ],
};

const ExpandableParagraph = ({
  children,
  maxLines = 4,
  className = "",
}: {
  children: React.ReactNode;
  maxLines?: number;
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkTextOverflow = () => {
      if (textRef.current) {
        const lineHeight = parseInt(
          getComputedStyle(textRef.current).lineHeight
        );
        const maxHeight = lineHeight * maxLines;
        const actualHeight = textRef.current.scrollHeight;

        setNeedsExpansion(actualHeight > maxHeight);
      }
    };

    checkTextOverflow();
    window.addEventListener("resize", checkTextOverflow);

    return () => window.removeEventListener("resize", checkTextOverflow);
  }, [children, maxLines]);

  return (
    <div className={className}>
      <p
        ref={textRef}
        className={`text-lg font-secondary text-muted-dark transition-all duration-300 ${
          !isExpanded && needsExpansion ? "line-clamp-4" : ""
        }`}
        style={{
          WebkitLineClamp: !isExpanded && needsExpansion ? maxLines : "unset",
          lineClamp: !isExpanded && needsExpansion ? maxLines : "unset",
        }}
      >
        {children}
      </p>
      {needsExpansion && (
        <Button
          variant="link"
          className="p-0 h-auto shadow-none text-primary hover:text-primary-dark font-semibold mt-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Ler menos" : "Ler mais"}
        </Button>
      )}
    </div>
  );
};

const AnimatedCounter = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}+</span>;
};

const VerticalMarquee = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const messages = [
    "Escola Referência na Região",
    "Educação de Qualidade Comprovada",
    "Professores Altamente Qualificados",
    "Metodologia Inovadora",
    "Formação Integral do Aluno",
    "Infraestrutura Completa",
    "Parceria com as Famílias",
    "Projetos Sustentáveis",
    "Desenvolvimento Criativo",
    "Atividades Extracurriculares",
  ];

  useEffect(() => {
    const currentMessage = messages[currentIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && currentText !== currentMessage) {
        setCurrentText(currentMessage.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      } else if (isDeleting && currentText !== "") {
        setCurrentText(currentText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else if (!isDeleting && currentText === currentMessage) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setTypingSpeed(500);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, messages, typingSpeed]);

  return (
    <div className="h-12 flex items-center justify-center overflow-hidden">
      <div className="text-lg font-secondary text-primary-dark font-medium text-center">
        {currentText}
        <span className="ml-1 animate-ping">|</span>
      </div>
    </div>
  );
};

export default function Sobre() {
  const calculateYearsOfExperience = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - 1993;
  };

  const features = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Corpo Docente Qualificado",
      description:
        "Professores especializados e comprometidos com o desenvolvimento integral dos alunos.",
    },
    {
      icon: <NotebookPen className="w-12 h-12 text-primary" />,
      title: "Metodologia Inovadora",
      description:
        "Proposta pedagógica que estimula a curiosidade, criatividade e pensamento crítico.",
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      title: "Formação Completa",
      description:
        "Preparação acadêmica e humana para os desafios do século XXI.",
    },
    {
      icon: <HeartHandshake className="w-12 h-12 text-primary" />,
      title: "Ambiente Acolhedor",
      description:
        "Espaço seguro e inclusivo que promove o bem-estar e o desenvolvimento socioemocional.",
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: "Excelência Educacional",
      description:
        "Compromisso com a qualidade do ensino e resultados consistentes.",
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: "Tradição e Inovação",
      description:
        "Comprometidos com a evolução constante da educação e formação de valores.",
    },
  ];

  const schoolInfo = [
    {
      title: "Missão",
      content:
        "Proporcionar educação de qualidade que forme cidadãos críticos, éticos e preparados para transformar a sociedade.",
    },
    {
      title: "Visão",
      content:
        "Ser referência em educação básica, reconhecida pela excelência acadêmica e formação humana integral.",
    },
    {
      title: "Valores",
      content:
        "Ética, respeito, responsabilidade, inovação, cooperação e compromisso com o aprendizado contínuo.",
    },
  ];

  const stats = [
    {
      value: calculateYearsOfExperience(),
      label: "Anos de Experiência",
      icon: <Trophy className="w-6 h-6" />,
    },
    {
      value: 1000,
      label: "Alunos Formados",
      icon: <GraduationCap className="w-6 h-6" />,
    },
    { value: 70, label: "Profissionais", icon: <Users className="w-6 h-6" /> },
    { value: 99, label: "Satisfação", icon: <Heart className="w-6 h-6" /> },
  ];

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto py-30 px-4">
        <AnimatedSection direction="up" animateOnMount>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold font-primary text-primary-dark mb-6">
              Sobre a Escola
            </h1>
            <p className="text-xl font-secondary text-muted-dark max-w-3xl mx-auto">
              Comprometidos com a formação de cidadãos preparados para os
              desafios do futuro através de uma educação de excelência e valores
              sólidos.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1}>
          <Card className="mb-16 border-primary/20 shadow-lg lg:w-4xl 4xl:w-auto w-auto mx-auto">
            <CardContent className="sm:p-8 p-4">
              <h2 className="text-3xl font-bold font-primary text-primary-dark mb-6 text-center">
                Nossa História
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <ExpandableParagraph className="mb-4">
                    O Centro Educacional Pinheiros nasceu do sonho de oferecer
                    uma educação transformadora na região. Fundada em 1993,
                    começamos com uma estrutura dedicada e grandes ideias, e
                    hoje somos uma instituição reconhecida pela qualidade do
                    nosso ensino.
                  </ExpandableParagraph>
                  <ExpandableParagraph>
                    Ao longo de {calculateYearsOfExperience()} anos de
                    trajetória, mantemos nosso compromisso com a excelência
                    acadêmica e a formação de valores, sempre adaptando nossa
                    metodologia às necessidades de cada nova geração de
                    estudantes.
                  </ExpandableParagraph>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
                  <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4">
                    {stats.map((stat, index) => (
                      <AnimatedSection
                        key={stat.label}
                        direction="up"
                        delay={0.2 + index * 0.1}
                      >
                        <div className="text-center group hover:scale-105 transition-transform duration-300">
                          <div className="flex justify-center items-center mb-2">
                            <div className="text-primary mr-2 group-hover:scale-110 transition-transform">
                              {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-primary-dark">
                              {stat.label === "Satisfação" ? (
                                <>{stat.value}%</>
                              ) : (
                                <AnimatedCounter
                                  end={stat.value}
                                  duration={2000}
                                />
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-muted-dark font-medium">
                            {stat.label}
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-primary/20">
                    <p className="text-sm text-muted-dark italic">
                      Números que comprovam nossa excelência educacional!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.05}>
          <Card className="mb-16 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 shadow-lg sm:w-lg w-auto flex items-center justify-center mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Star className="w-5 h-5 text-primary animate-pulse fill-primary" />
                <span className="text-sm font-semibold text-primary-dark text-center">
                  Destaques do Centro Educacional Pinheiros
                </span>
                <Star className="w-5 h-5 text-primary animate-pulse fill-primary" />
              </div>

              <VerticalMarquee />

              <div className="text-xs text-primary/70 text-center mt-2">
                Mensagens alternadas a cada 3 segundos
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-primary text-primary-dark mb-12 text-center">
              Nossos Diferenciais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                  <Card className="h-full p-6 border-muted-light hover:border-primary transition-all duration-300 hover:shadow-lg group">
                    <CardContent className="flex flex-col items-center text-center gap-4">
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
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
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-primary text-primary-dark mb-12 text-center">
              Nossa Identidade
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {schoolInfo.map((item, index) => (
                <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                  <Card className="h-full p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors duration-300">
                    <CardContent className="text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {index === 0 && (
                          <School className="w-6 h-6 text-primary" />
                        )}
                        {index === 1 && (
                          <Award className="w-6 h-6 text-primary" />
                        )}
                        {index === 2 && (
                          <Heart className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <h3 className="text-2xl font-bold font-primary text-primary-dark mb-4">
                        {item.title}
                      </h3>
                      <ExpandableParagraph maxLines={4}>
                        {item.content}
                      </ExpandableParagraph>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.4}>
          <div className="mb-16">
            <Card className="bg-primary/5 border-primary/20 shadow-xl sm:w-xl w-auto mx-auto">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <School className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-primary text-primary-dark mb-4">
                  Venha nos Conhecer!
                </h3>
                <p className="text-lg font-secondary mb-6 opacity-90">
                  Descubra por que famílias confiam na nossa Escola há mais de{" "}
                  {calculateYearsOfExperience()} anos para oferecer a melhor
                  formação educacional e humana aos seus alunos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="font-semibold text-foreground border-primary border-1 transition-colors"
                    asChild
                  >
                    <Link to="/contato">Agendar Visita</Link>
                  </Button>
                  {/* <Button
                    size="lg"
                    variant="ghost"
                    className="font-semibold text-foreground border-primary border-1 transition-colors"
                    asChild
                  >
                    <Link to="/eventos">Ver Nossos Eventos</Link>
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.35}>
          <Staff
            directors={teamMembers.directors}
            coordinators={teamMembers.coordinators}
          />
        </AnimatedSection>
      </div>
      <FloatButton />
    </div>
  );
}
