import { useState, useEffect, useRef } from "react";
import { Code, Zap, Trophy, Users, Brain, Rocket } from "lucide-react";

const LearningProcessSection = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const phases = [
    {
      id: "foundation",
      title: "Основы",
      icon: Code,
      description: "Изучаем синтаксис языка и базовые концепции программирования",
      duration: "2-3 недели"
    },
    {
      id: "practice",
      title: "Практика",
      icon: Zap,
      description: "Работаем с реальными задачами и создаем первые проекты",
      duration: "4-6 недель"
    },
    {
      id: "mastery",
      title: "Мастерство",
      icon: Trophy,
      description: "Создаем полноценные приложения и изучаем лучшие практики",
      duration: "6-8 недель"
    },
    {
      id: "teamwork",
      title: "Командная работа",
      icon: Users,
      description: "Участвуем в групповых проектах и изучаем методологии разработки",
      duration: "2-3 недели"
    },
    {
      id: "expertise",
      title: "Экспертиза",
      icon: Brain,
      description: "Углубляемся в архитектурные паттерны и оптимизацию",
      duration: "3-4 недели"
    },
    {
      id: "career",
      title: "Карьера",
      icon: Rocket,
      description: "Подготовка портфолио, собеседования и поиск работы",
      duration: "2-3 недели"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        setScrollProgress(progress);
        
        const phaseIndex = Math.floor(progress * phases.length);
        setActivePhase(Math.min(phaseIndex, phases.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phases.length]);

  return (
    <section ref={sectionRef} className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Процесс обучения
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Пройдите путь от новичка до профессионала за 6 этапов
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Progress line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block">
            <div 
              className="w-full bg-primary transition-all duration-300"
              style={{ height: `${(scrollProgress * 100)}%` }}
            />
          </div>
          
          <div className="space-y-8">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              const isActive = index <= activePhase;
              
              return (
                <div
                  key={phase.id}
                  className={`relative flex items-start gap-8 transition-all duration-500 ${
                    isActive 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-40 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Step indicator */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-background border-border text-muted-foreground'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {index < phases.length - 1 && (
                      <div className="absolute top-16 left-1/2 w-px h-8 bg-border transform -translate-x-1/2 md:hidden" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-foreground">
                          {phase.title}
                        </h3>
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {phase.duration}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
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

export default LearningProcessSection;