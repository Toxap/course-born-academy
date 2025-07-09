import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
const HeroSection = () => {
  const scrollToCourses = () => {
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="hero" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Video */}
      <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="http://cdn.bornsite.ru/static/backAInew.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-navy/60 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-left px-8 py-0">
        <h1 className="text-6xl md:text-8xl text-white leading-tight lg:text-8xl font-bold text-left">
          <span className="mx-[44px] text-slate-200">Course</span>
          <span className="block mx-0 my-0 px-[237px] text-red-700">Born</span>
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/60" />
        </div>
      </div>
    </section>;
};
export default HeroSection;