import { Search, UserCheck, Trophy } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const HowItWorksSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [lineProgress, setLineProgress] = useState(0);
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
            
            setLineProgress(progress);
            
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Как это работает
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Простой и понятный процесс обучения от выбора курса до трудоустройства
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical animated line with glow */}
          <div className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-transparent via-slate-600 to-transparent h-full transform -translate-x-1/2">
            <div 
              className="w-full bg-gradient-to-b from-primary via-accent to-primary transition-all duration-1000 ease-out shadow-lg shadow-primary/50"
              style={{
                height: `${lineProgress * 100}%`
              }}
            />
          </div>
          
          <div className="space-y-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isVisible = visibleSteps.includes(index);
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className={`flex items-center gap-8 ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  } transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : `opacity-0 ${isLeft ? '-translate-x-8' : 'translate-x-8'}`
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className={`p-6 rounded-2xl bg-gradient-to-br ${
                      isLeft 
                        ? 'from-slate-800/50 to-slate-700/30 border-l-2 border-primary/50' 
                        : 'from-slate-800/50 to-slate-700/30 border-r-2 border-accent/50'
                    } backdrop-blur-sm shadow-xl transition-all duration-500 ${
                      isVisible ? 'shadow-primary/20' : ''
                    }`}>
                      <h3 className="text-xl font-semibold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Central icon area */}
                  <div className="flex flex-col items-center relative z-10">
                    {/* Step number */}
                    <div className={`bg-gradient-to-br from-primary to-accent text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mb-4 transition-all duration-500 shadow-lg ${
                      isVisible ? 'scale-100 shadow-primary/50' : 'scale-0'
                    }`}>
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className={`bg-gradient-to-br from-slate-800 to-slate-700 p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-xl border border-slate-600 transition-all duration-500 delay-200 ${
                      isVisible ? 'scale-100 rotate-0 shadow-primary/30' : 'scale-0 rotate-12'
                    }`}>
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="flex-1"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;