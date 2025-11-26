import { Link } from "react-router-dom";
import AnimatedSection from "@/components/animations/AnimatedSection";

export default function Hero() {
  return (
    <div className="w-full bg-primary-light/10 relative overflow-hidden">
      <div className="relative container mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="min-h-[40vh] sm:min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] flex flex-col justify-center items-center py-8 sm:py-10 md:py-12 lg:py-16">
          <AnimatedSection direction="up" delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-extrabold font-primary text-primary-dark mb-4 sm:mb-5 md:mb-6">
              Centro Educacional Pinheiros
            </h1>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.4}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-secondary text-muted-dark mb-6 sm:mb-7 md:mb-8 max-w-2xl lg:max-w-3xl px-2 sm:px-4">
              Educação de <span className="font-bold">qualidade</span> e{" "}
              <span className="font-bold">formação plena</span> para o futuro
              dos nossos alunos.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.6}>
            <Link
              to="/sobre"
              className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-md bg-primary text-white font-semibold font-primary hover:bg-primary-dark transition text-sm sm:text-base md:text-lg"
            >
              Conheça Nossa Escola
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
