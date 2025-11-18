import Hero from "../Home/components/Hero";
import About from "../Home/components/About";
import Promotion from "../Home/components/Promotion";
import Feedback from "../Home/components/Feedback";
// import IntroCarousel from "./components/IntroCarousel";
import FloatButton from "@/components/global/FloatButton";

export default function Home() {
  return (
    <div className="w-full">
      {/* <IntroCarousel /> */}
      <Hero />
      <About />
      <Promotion />
      <Feedback className="py-20" />
      <FloatButton />
    </div>
  );
}
