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
      description: "Ты занимаешься в том же режиме как и Твоя же профессиональная IT-деятельность. Будут использоваться те же методы выстраивания рабочих процессов, что и на рабочем месте: выполнение по дедлайнам, уточнения на каждое действие, планирование."
    },
    {
      title: "Сочетание разных форматов",
      icon: Users,
      description: "Тебе дают видеоуроки, текстовые лекции, практические задания, аудиоконференции, самостоятельные и командные задания, мультимедийные задачи и многое еще."
    },
    {
      title: "Востребованность студентов",
      icon: Award,
      description: "Образовательные программы PAUTO School построены таким образом, что 80% всего обучения — это практика с целью максимально приблизить рабочие ситуации, где нужны навыки."
    },
    {
      title: "Интенсивный формат обучения",  
      icon: Target,
      description: "Мы стараемся максимально быстро и эффективно освоить профессию, включая теоретические основы и практические исследования в кратчайшие сроки."
    },
    {
      title: "Постоянная поддержка",
      icon: Lightbulb,
      description: "В процессе обучения предусмотрены наставники — действующие разработчики, а также куратор и сообщество таких выпускников."
    },
    {
      title: "Лучшие практики индустрии",
      icon: Code,
      description: "В обучении используем лучшие практики и методики из индустрии, а также актуальные инструменты программирования."
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
              }, index * 300);
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

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % processes.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + processes.length) % processes.length);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(14,165,233,0.08),transparent_70%)]"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Процесс обучения
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Структурированный подход к обучению с максимальным погружением в практику
          </p>
        </div>

        {/* Process blocks grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
                  {/* Connection lines */}
                  {index < processes.length - 1 && (
                    <div className="hidden xl:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent z-10"></div>
                  )}
                  
                  <Card 
                    className={`h-full bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm border transition-all duration-500 cursor-pointer group hover:-translate-y-2 ${
                      isActive 
                        ? 'border-blue-400/60 shadow-lg shadow-blue-500/25' 
                        : 'border-slate-600/50 hover:border-blue-500/50'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <CardContent className="p-8 h-full flex flex-col">
                      {/* Icon and number */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30' 
                            : 'bg-gradient-to-br from-slate-700 to-slate-600 group-hover:from-blue-600 group-hover:to-cyan-600'
                        }`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          isActive 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-slate-600 text-gray-300 group-hover:bg-blue-600 group-hover:text-white'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-200 transition-colors duration-300">
                        {process.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed text-sm flex-grow group-hover:text-gray-200 transition-colors duration-300">
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

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prevStep}
            className="p-3 rounded-full bg-slate-800/50 border border-slate-600/50 text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/20 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex gap-2">
            {processes.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-blue-500 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextStep}
            className="p-3 rounded-full bg-slate-800/50 border border-slate-600/50 text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/20 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningProcessSection;