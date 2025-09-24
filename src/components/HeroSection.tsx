import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const [isVideoAvailable, setIsVideoAvailable] = useState(true);

  const scrollToForm = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const element = window.document.getElementById("contact-form");
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Video */}
      {isVideoAvailable ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          onError={() => setIsVideoAvailable(false)}
        >
          <source src="https://cdn.bornsite.ru/static/backAInew.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 z-0"
          aria-hidden
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-navy/60 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 px-8 py-0">
        <h1 className="text-6xl md:text-8xl text-white leading-tight lg:text-8xl font-bold text-left mb-6">
          <span className="mx-[44px] text-slate-200">Course</span>
          <span className="block mx-0 my-0 px-[237px] text-red-700">Born</span>
        </h1>
      </div>

      {/* Context and CTA - separate positioned element */}
      <div className="absolute right-8 top-2/3 transform -translate-y-1/2 z-20 text-right max-w-xl">
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Революционная платформа для изучения программирования с искусственным интеллектом. 
          Персонализированное обучение, практические проекты и менторство ИИ.
        </p>
        
        {/* CTA Button */}
        <div>
          <Button 
            variant="hero"
            size="lg"
            onClick={scrollToForm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30"
          >
            Начать обучение
          </Button>
        </div>
      </div>

      {/* Login Button */}
      <div className="absolute top-8 right-8 z-20">
        <Button 
          variant="ghost" 
          className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm"
        >
          Войти
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
