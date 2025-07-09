import { useState, useEffect, useRef } from "react";
import { BookOpen, Users, Award, Lightbulb, Target, Code } from "lucide-react";

const LearningProcessSection = () => {
  const [visibleBlocks, setVisibleBlocks] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const processes = [
    {
      title: "Моделирование реального опыта",
      icon: BookOpen,
      description: "Ты занимаешься в том же режиме как и Твоя же профессиональная IT-деятельность. Будут использоваться те же методы выстраивания рабочих процессов.",
      highlight: "реальный опыт",
      shape: "circle"
    },
    {
      title: "Сочетание разных форматов",
      icon: Users,
      description: "Тебе дают видеоуроки, текстовые лекции, практические задания, аудиоконференции, самостоятельные и командные задания.",
      highlight: "разные форматы",
      shape: "square"
    },
    {
      title: "Востребованность студентов",
      icon: Award,
      description: "Образовательные программы построены таким образом, что 80% всего обучения — это практика с целью максимально приблизить рабочие ситуации.",
      highlight: "80% практики",
      shape: "triangle"
    },
    {
      title: "Интенсивный формат обучения",  
      icon: Target,
      description: "Мы стараемся максимально быстро и эффективно освоить профессию, включая теоретические основы и практические исследования.",
      highlight: "быстро и эффективно",
      shape: "hexagon"
    },
    {
      title: "Постоянная поддержка",
      icon: Lightbulb,
      description: "В процессе обучения предусмотрены наставники — действующие разработчики, а также куратор и сообщество таких выпускников.",
      highlight: "24/7 поддержка",
      shape: "diamond"
    },
    {
      title: "Лучшие практики индустрии",
      icon: Code,
      description: "В обучении используем лучшие практики и методики из индустрии, а также актуальные инструменты программирования.",
      highlight: "лучшие практики",
      shape: "star"
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
              }, index * 200);
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

  const getShapeClasses = (shape: string, isVisible: boolean) => {
    const baseClasses = "w-16 h-16 flex items-center justify-center transition-all duration-500";
    const visibleClasses = isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0";
    
    switch (shape) {
      case "circle":
        return `${baseClasses} ${visibleClasses} rounded-full bg-gradient-to-br from-blue-500 to-cyan-500`;
      case "square":
        return `${baseClasses} ${visibleClasses} rounded-lg bg-gradient-to-br from-purple-500 to-pink-500`;
      case "triangle":
        return `${baseClasses} ${visibleClasses} bg-gradient-to-br from-green-500 to-emerald-500 transform rotate-45`;
      case "hexagon":
        return `${baseClasses} ${visibleClasses} bg-gradient-to-br from-orange-500 to-red-500 transform rotate-12`;
      case "diamond":
        return `${baseClasses} ${visibleClasses} bg-gradient-to-br from-indigo-500 to-blue-500 transform rotate-45`;
      case "star":
        return `${baseClasses} ${visibleClasses} bg-gradient-to-br from-yellow-500 to-orange-500 rounded-sm transform rotate-12`;
      default:
        return `${baseClasses} ${visibleClasses} rounded-full bg-gradient-to-br from-gray-500 to-gray-600`;
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-cyan-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-100/40 to-yellow-100/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
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

        {/* Process timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connecting line that flows through items */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet">
            <path
              d="M 200 120 Q 300 120 350 180 T 500 180 Q 600 180 650 240 T 800 240 Q 850 240 850 300 L 850 350 Q 850 410 750 410 T 650 470 Q 550 470 500 530 T 350 530 Q 250 530 200 590"
              stroke="url(#flowGradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="12,6"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="25%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="75%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>

          {/* Process items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 relative z-10">
            {processes.map((process, index) => {
              const IconComponent = process.icon;
              const isVisible = visibleBlocks.includes(index);
              
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Connection line to next element */}
                  {index < processes.length - 1 && (
                    <div className="absolute top-8 left-full w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent hidden lg:block z-20"></div>
                  )}
                  
                  {/* Shape container */}
                  <div className="flex flex-col items-center mb-6 relative">
                    <div className={getShapeClasses(process.shape, isVisible)}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Connection dot positioned at line intersection */}
                    <div className={`absolute top-8 -right-6 w-3 h-3 rounded-full transition-all duration-500 z-30 ${
                      isVisible 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-100 shadow-lg shadow-blue-500/50' 
                        : 'bg-gray-300 scale-0'
                    }`}></div>
                    
                    {/* Left connection dot for even indexes */}
                    {index % 2 === 0 && (
                      <div className={`absolute top-8 -left-6 w-3 h-3 rounded-full transition-all duration-500 z-30 ${
                        isVisible 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-100 shadow-lg shadow-purple-500/50' 
                          : 'bg-gray-300 scale-0'
                      }`}></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    {/* Highlight badge */}
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {process.highlight}
                    </div>
                    
                    {/* Number */}
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      {process.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 cursor-pointer hover:-translate-y-1">
            Начать обучение сегодня
            <div className="bg-white/20 rounded-full p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcessSection;