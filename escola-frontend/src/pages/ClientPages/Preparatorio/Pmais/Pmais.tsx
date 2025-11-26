import Hero from "./components/Hero";
import Features from "./components/Features";
import Courses from "./components/Courses";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";

export default function PreparatorioPmais() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Hero />
      <Features />
      <Courses />
      <Benefits />
      <CTA />
    </div>
  );
}
