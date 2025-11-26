import AnimatedSection from "@/components/animations/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  BookmarkCheck,
  CheckCircle,
  UserRoundCheck,
  ShieldCheck,
} from "lucide-react";
import ApprovedImage from "@/assets/pmais/Aluno_Aprovado.jpg";

export default function Benefits() {
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

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5 transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {" "}
          {/* Mudado para items-stretch */}
          <AnimatedSection direction="zoom">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full">
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
            <Card className="bg-gradient-to-br from-primary/20 to-secondary/10 border-2 border-primary/20 h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Vantagens Exclusivas
                  </h3>
                  <p className="text-foreground/80">
                    Descubra os benefícios que fazem a diferença
                  </p>
                </div>

                <div className="space-y-4 flex-1">
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
                      <div className="text-2xl font-bold text-primary">95%</div>
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
                      <div className="text-2xl font-bold text-success">4.9</div>
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
  );
}
