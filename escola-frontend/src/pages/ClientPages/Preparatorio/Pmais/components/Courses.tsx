import { useState } from "react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Course {
  name: string;
  description: string;
  color: string;
  concursos: string[];
}

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      name: "Português",
      description: "Essencial em quase todos os concursos públicos",
      color: "bg-primary/20 border-primary",
      concursos: [
        "ESA - Escola de Sargentos das Armas",
        "EEAR - Escola de Especialistas de Aeronáutica",
        "CBMERJ - Corpo de Bombeiros Militar do RJ",
        "PF/PC - Polícia Federal e Civil",
        "ENEM - Exame Nacional do Ensino Médio",
        "CEF - Caixa Econômica Federal",
        "BB - Banco do Brasil",
        "INSS - Instituto Nacional do Seguro Social",
        "TJ - Tribunal de Justiça",
        "MPU - Ministério Público da União",
      ],
    },
    {
      name: "Matemática",
      description: "Essencial em quase todos os concursos públicos",
      color: "bg-info/20 border-info",
      concursos: [
        "ESA - Escola de Sargentos das Armas",
        "EEAR - Escola de Especialistas de Aeronáutica",
        "ENEM - Exame Nacional do Ensino Médio",
        "EFOMM - Escola de Formação de Oficiais da Marinha Mercante",
        "AFA - Academia da Força Aérea",
        "CN - Colégio Naval",
        "ESPCEX - Escola Preparatória de Cadetes do Exército",
        "CBMERJ - Corpo de Bombeiros Militar do RJ",
        "CEF - Caixa Econômica Federal",
        "BB - Banco do Brasil",
      ],
    },
    {
      name: "Redação",
      description: "Essencial em concursos que exigem produção textual",
      color: "bg-success/20 border-success",
      concursos: [
        "ENEM - Exame Nacional do Ensino Médio",
        "ESA - Escola de Sargentos das Armas",
        "EEAR - Escola de Especialistas de Aeronáutica",
        "AFA - Academia da Força Aérea",
        "ESPCEX - Escola Preparatória de Cadetes do Exército",
        "Concursos de Nível Superior",
        "Universidades Públicas",
        "Concursos com Prova Discursiva",
        "Seleções com Análise de Títulos",
      ],
    },
    {
      name: "Química",
      description: "Essencial para concursos na área de saúde e tecnologia",
      color: "bg-warning/20 border-warning",
      concursos: [
        "ENEM - Exame Nacional do Ensino Médio",
        "EFOMM - Escola de Formação de Oficiais da Marinha Mercante",
        "CFO - Curso de Formação de Oficiais",
        "AFA - Academia da Força Aérea",
        "ESA - Escola de Sargentos das Armas",
        "EEAR - Escola de Especialistas de Aeronáutica",
        "Vestibulares de Medicina",
        "Concursos para Perito Criminal",
        "Concurso para Técnico de Laboratório",
        "Seleções para Universidades de Engenharia",
      ],
    },
    {
      name: "Física",
      description:
        "Essencial para concursos na área de engenharia e tecnologia",
      color: "bg-purple-500/20 border-purple-500",
      concursos: [
        "ENEM - Exame Nacional do Ensino Médio",
        "EFOMM - Escola de Formação de Oficiais da Marinha Mercante",
        "AFA - Academia da Força Aérea",
        "ITA - Instituto Tecnológico de Aeronáutica",
        "IME - Instituto Militar de Engenharia",
        "ESA - Escola de Sargentos das Armas",
        "EEAR - Escola de Especialistas de Aeronáutica",
        "Vestibulares de Engenharia",
        "Concursos para Engenheiros",
        "Seleções Técnico-Científicas",
      ],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-tr from-success/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Matérias <span className="text-primary">Fornecidas</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Preparação especializada para os principais concursos públicos
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.1}>
              <Card
                className={`border-2 ${course.color} hover:shadow-lg transition-all duration-300 h-full flex flex-col group cursor-pointer`}
                onClick={() => setSelectedCourse(course)}
              >
                <CardContent className="p-6 text-center flex flex-col flex-grow">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce transition-transform shadow-md">
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
                    className="sm:w-full bg-background w-fit mx-auto mt-auto group-hover:animate-pulse"
                    variant="outline"
                  >
                    Ver Informações
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <Dialog
          open={!!selectedCourse}
          onOpenChange={() => setSelectedCourse(null)}
        >
          <DialogContent className="sm:max-w-md md:max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Concursos - {selectedCourse?.name}</span>
              </DialogTitle>
              <DialogDescription className="text-start">
                Principais concursos que exigem conhecimentos em{" "}
                {selectedCourse?.name.toLowerCase()}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCourse?.concursos.map((concurso, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gradient-to-r from-primary-light/20 to-text/10 rounded-lg hover:from-primary-dark/50 hover:to-text/30 transition-colors"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-text">
                      {concurso}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  💡 <strong>Dica:</strong> Esta matéria é fundamental para
                  diversos concursos. Entre em contato para saber mais sobre
                  nossa preparação específica!
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
