import Hero from "./components/Hero";
import TAFCarousel from "./components/TAFCarousel";
import Tests from "./components/Tests";
import Methodology from "./components/Methodology";
import Results from "./components/Results";
import CTA from "./components/CTA";

export default function PreparatorioTaf() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Hero />
      <TAFCarousel />
      <Tests />
      <Methodology />
      <Results />
      <CTA />
    </div>
  );
}
