import { Search, UserCheck, Trophy } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const HowItWorksSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Выбираете курс",
      description: "Изучаете программу обучения и выбираете подходящий курс из нашего каталога"
    },
    {
      icon: UserCheck,
      number: "02", 
      title: "Занимаетесь с наставником",
      description: "Проходите теорию, выполняете практические задания под руководством опытного ментора"
    },
    {
      icon: Trophy,
      number: "03",
      title: "Получаете навыки и портфолио",
      description: "Завершаете обучение с готовыми проектами и навыками для трудоустройства"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
            
            // Показываем шаги постепенно
            const stepThresholds = [0.3, 0.6, 0.9];
            const newVisibleSteps: number[] = [];
            
            stepThresholds.forEach((threshold, index) => {
              if (progress >= threshold) {
                newVisibleSteps.push(index);
              }
            });
            
            setVisibleSteps(newVisibleSteps);
          }
        });
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            Как это работает
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Простой и понятный процесс обучения от выбора курса до трудоустройства
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-red-600/30"></div>
            
            <div className="space-y-16">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isVisible = visibleSteps.includes(index);
                
                return (
                  <div 
                    key={index} 
                    className={`relative transition-all duration-700 ease-out ${
                      isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-16'
                    }`}
                    style={{ transitionDelay: `${index * 300}ms` }}
                  >
                    {/* Center circle on line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-20">
                      <div className="w-12 h-12 bg-red-600 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">{step.number}</span>
                      </div>
                    </div>
                    
                    {/* Card */}
                    <div className={`relative max-w-md mx-auto ${
                      index % 2 === 0 ? 'md:mr-auto md:ml-0 md:translate-x-8' : 'md:ml-auto md:mr-0 md:-translate-x-8'
                    }`}>
                      <div className="bg-slate-800 rounded-3xl border-2 border-red-900/50 p-8 hover:border-red-600/70 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 hover:-translate-y-2 text-center group">
                        
                        {/* Icon */}
                        <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center">
                          <div className="absolute inset-0 bg-red-900 rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
                          <div className="absolute inset-2 bg-red-600/20 rounded-xl group-hover:scale-105 transition-transform duration-300 delay-100"></div>
                          <div className="relative z-10">
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-gray-200">
                            {step.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                        
                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-b-3xl"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;