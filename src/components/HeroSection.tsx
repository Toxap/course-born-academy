import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToCourses = () => {
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="http://cdn.bornsite.ru/static/backAInew.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-navy/60 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Программирование с нуля до первых проектов
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Онлайн-курсы и практические занятия с опытными наставниками
        </p>

        <Button 
          variant="hero" 
          size="lg"
          onClick={scrollToCourses}
          className="text-lg px-8 py-4 h-auto"
        >
          Начать обучение
          <ArrowDown className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;