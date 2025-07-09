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
    <section ref={sectionRef} className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Как это работает
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простой и понятный процесс обучения от выбора курса до трудоустройства
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Animated connection line */}
            <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-accent overflow-hidden">
              <div 
                className="h-full bg-gradient-accent transition-all duration-1000 ease-out"
                style={{
                  width: `${lineProgress * 100}%`,
                  transform: 'translateX(0)'
                }}
              />
            </div>
            
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isVisible = visibleSteps.includes(index);
              
              return (
                <div 
                  key={index} 
                  className={`text-center relative transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {/* Step number */}
                  <div className={`bg-gradient-accent text-white rounded-full w-12 h-12 mx-auto mb-6 flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                    isVisible ? 'scale-100' : 'scale-0'
                  }`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`bg-card p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-soft transition-all duration-500 delay-200 ${
                    isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-12'
                  }`}>
                    <IconComponent className="h-8 w-8 text-accent" />
                  </div>
                  
                  {/* Content */}
                  <div className={`transition-all duration-500 delay-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
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