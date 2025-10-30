import Hero from "../Home/components/Hero";
import About from "../Home/components/About";
import Promotion from "../Home/components/Promotion";
import Feedback from "../Home/components/Feedback";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Promotion />
      <Feedback className="py-20" />
    </div>
  );
}
