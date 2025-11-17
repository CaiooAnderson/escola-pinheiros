import { Link } from "react-router-dom";
import AnimatedSection from "@/components/animations/AnimatedSection";

export default function Hero() {
  return (
    <div className="w-full bg-primary-light/10 relative overflow-hidden">
      <div className="relative container mx-auto flex flex-col items-center justify-center text-center px-4 h-dvh">
        <AnimatedSection direction="up" delay={0}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-primary text-primary-dark mb-6">
            Centro Educacional Pinheiros
          </h1>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <p className="text-lg sm:text-xl lg:text-2xl font-secondary text-muted-dark mb-8 max-w-2xl">
            Educação de <span className="font-bold">qualidade</span> e{" "}
            <span className="font-bold">formação plena</span> para o futuro dos
            nossos alunos.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.4}>
          <Link
            to="/sobre"
            className="inline-block px-6 py-3 rounded-md bg-primary text-white font-semibold font-primary hover:bg-primary-dark transition"
          >
            Conheça Nossa Escola
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
