import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, BookOpen, Users, Award, Lightbulb, Target, Code } from "lucide-react";

const LearningProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleBlocks, setVisibleBlocks] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const processes = [
    {
      title: "Моделирование реального опыта",
      icon: BookOpen,
      description: "Ты занимаешься в том же режиме как и Твоя же профессиональная IT-деятельность. Будут использоваться те же методы выстраивания рабочих процессов.",
      highlight: "реальный опыт"
    },
    {
      title: "Сочетание разных форматов",
      icon: Users,
      description: "Тебе дают видеоуроки, текстовые лекции, практические задания, аудиоконференции, самостоятельные и командные задания.",
      highlight: "разные форматы"
    },
    {
      title: "Востребованность студентов",
      icon: Award,
      description: "Образовательные программы построены таким образом, что 80% всего обучения — это практика с целью максимально приблизить рабочие ситуации.",
      highlight: "80% практики"
    },
    {
      title: "Интенсивный формат обучения",  
      icon: Target,
      description: "Мы стараемся максимально быстро и эффективно освоить профессию, включая теоретические основы и практические исследования.",
      highlight: "быстро и эффективно"
    },
    {
      title: "Постоянная поддержка",
      icon: Lightbulb,
      description: "В процессе обучения предусмотрены наставники — действующие разработчики, а также куратор и сообщество таких выпускников.",
      highlight: "24/7 поддержка"
    },
    {
      title: "Лучшие практики индустрии",
      icon: Code,
      description: "В обучении используем лучшие практики и методики из индустрии, а также актуальные инструменты программирования.",
      highlight: "лучшие практики"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            processes.forEach((_, index) => {
              setTimeout(() => {
                setVisibleBlocks(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-cyan-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-100/40 to-yellow-100/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            ⚡ Премиальный опыт образования
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Процесс <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">обучения</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Структурированный подход к обучению с максимальным погружением в практику
          </p>
        </div>

        {/* Process blocks */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processes.map((process, index) => {
              const IconComponent = process.icon;
              const isVisible = visibleBlocks.includes(index);
              const isActive = activeStep === index;
              
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card 
                    className={`h-full bg-white border-2 transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:shadow-2xl ${
                      isActive 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <CardContent className="p-8 h-full flex flex-col">
                      {/* Icon and badge */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-4 rounded-2xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30' 
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-500 group-hover:to-cyan-500'
                        }`}>
                          <IconComponent className={`h-7 w-7 transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-gray-700 group-hover:text-white'
                          }`} />
                        </div>
                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                      
                      {/* Highlight badge */}
                      <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                        {process.highlight}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                        {process.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed flex-grow group-hover:text-gray-700 transition-colors duration-300">
                        {process.description}
                      </p>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={() => setActiveStep((prev) => (prev - 1 + processes.length) % processes.length)}
            className="p-4 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex gap-3">
            {processes.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-3'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % processes.length)}
            className="p-4 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 cursor-pointer">
            Начать обучение сегодня
            <div className="bg-white/20 rounded-full p-1">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcessSection;