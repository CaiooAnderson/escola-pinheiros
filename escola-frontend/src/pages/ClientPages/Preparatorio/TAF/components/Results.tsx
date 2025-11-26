import AnimatedSection from "@/components/animations/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle } from "lucide-react";

const results = [
  { value: "95%", label: "Taxa de Aprovação" },
  { value: "1000+", label: "Alunos Preparados" },
  { value: "4.9", label: "Avaliação dos Alunos" },
  { value: "24/7", label: "Suporte Personalizado" },
];

export default function Results() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5 transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Resultados que <span className="text-success">Inspiram</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Nosso preparatório TAF é desenvolvido por profissionais de
                educação física com experiência em concursos públicos,
                garantindo que você atinja os padrões exigidos com{" "}
                <span className="text-primary font-semibold">segurança</span> e
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
                    className="text-center p-4 bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors"
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
            <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300">
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
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center group-hover:bg-success/30 transition-colors">
                        <CheckCircle className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-foreground font-medium text-sm group-hover:text-success transition-colors">
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
  );
}
